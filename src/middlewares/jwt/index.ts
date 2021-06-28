import { sign } from 'jsonwebtoken'
import { boomify } from '@hapi/boom'

import { JWT } from './jwt.dto'
import { Cache } from '../../config/index'

const { JWT_SECRET_KEY } = process.env

export default class JwtStrategy {
    public generateAccessToken = (payload: JWT): string => {
      try {
        return sign(payload, JWT_SECRET_KEY, {
          expiresIn: '15min'
        })
      } catch (err) {
        throw boomify(err)
      }
    }

    public generateRefreshToken = (payload: JWT): void => {
      try {
        const token = sign(payload, JWT_SECRET_KEY, {
          expiresIn: '1y'
        })
        Cache.set(payload._id, token, 31_556_952)
      } catch (err) {
        throw boomify(err)
      }
    }
}
