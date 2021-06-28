import { Request, Response, NextFunction } from '@tinyhttp/app'
import { verify } from 'jsonwebtoken'
import { boomify } from '@hapi/boom'

import { Token } from './guard.dto'
import JwtStrategy from '../jwt/index'
import { Cache } from '../../config/index'

const { JWT_SECRET_KEY } = process.env

class AuthGuard extends JwtStrategy {
    private getPayload = (token: string): Token => {
      return verify(token, JWT_SECRET_KEY) as Token
    }

    public guard = (req: Request, res: Response, next: NextFunction): Response | void => {
      const key = req.cookies.node_key
      if (!key) {
        return res.sendStatus(403)
      }
      try {
        const token = Cache.get(key)
        if (token === undefined) {
          res.clearCookie('node_key')
          return res.sendStatus(500)
        }
        const decoded = this.getPayload(token)
        // @ts-ignore
        req.tokenId = decoded._id
        return next()
      } catch (err) {
        throw boomify(err)
      }
    }
}

export default new AuthGuard()
