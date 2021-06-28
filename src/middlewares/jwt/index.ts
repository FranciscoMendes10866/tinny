import { sign } from 'jsonwebtoken'
import { boomify } from '@hapi/boom'
import { randomBytes } from 'crypto'

import { JWT } from './jwt.dto'
import { Cache } from '../../config/index'

const { JWT_SECRET_KEY } = process.env

export default class JwtStrategy {
    private generateKey = () => {
      return randomBytes(12).toString('hex')
    }

    public generateToken = (payload: JWT): string => {
      try {
        const token = sign(payload, JWT_SECRET_KEY)
        const key = this.generateKey()
        Cache.set(key, token, 604800)
        return key
      } catch (err) {
        throw boomify(err)
      }
    }
}
