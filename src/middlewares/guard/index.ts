import { Request, Response, NextFunction } from '@tinyhttp/app'
import { verify } from 'jsonwebtoken'
import { boomify } from '@hapi/boom'

import { Token, getPayloadTypes } from './guard.dto'
import JwtStrategy from '../jwt/index'
import { Cache } from '../../config/index'

const { JWT_SECRET_KEY, NODE_ENV } = process.env

class AuthGuard extends JwtStrategy {
    private signCookie = (token: string, res: Response): void => {
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production'
      })
    }

    private isExpired = (expiration: number): boolean => {
      if (Date.now() >= expiration * 1000) {
        return false
      } else {
        return true
      }
    }

    private getPayload = (token: string): getPayloadTypes => {
      const data = verify(token, JWT_SECRET_KEY) as Token
      return !this.isExpired(data.exp) ? { isExpired: true, payload: data } : { isExpired: false, payload: data }
    }

    public guard = (req: Request, res: Response, next: NextFunction): Response | void => {
      const token = req.cookies.access_token
      if (!token) {
        return res.sendStatus(403)
      }
      try {
        const { isExpired, payload } = this.getPayload(token)
        if (isExpired) {
          if (!!Cache.get(payload._id) === false) {
            const newToken = this.generateAccessToken({ _id: payload._id })
            this.signCookie(newToken, res)
            return res.json({ message: 'New access token.', oldToken: token, newToken })
          }
          res.clearCookie('access_token')
          return res.status(500).json({ message: 'No session.' })
        }
        // @ts-ignore
        req.tokenId = payload._id
        return next()
      } catch (err) {
        throw boomify(err)
      }
    }
}

export default new AuthGuard()
