import { App, Request, Response } from '@tinyhttp/app'

import BaseController from './services/index'
import { validate, AuthGuard } from './middlewares/index'
import findSchema from './schema/find'

import { Cache } from './config/index'

const router = (app: App) => {
  app.get('/', BaseController.index)
  app.post('/', BaseController.store)
  app.get('/stats', (req: Request, res: Response) => {
    return res.json(Cache.stats())
  })
  app.get('/test-login', (req: Request, res: Response) => {
    const data = {
      _id: 'qwerty'
    }
    const token = AuthGuard.generateAccessToken(data)
    AuthGuard.generateRefreshToken(data)
    return res.cookie('access_token', token, { httpOnly: true, secure: false }).sendStatus(200)
  })
  app.get('/test-logout', AuthGuard.guard, (req: Request, res: Response) => {
    // @ts-ignore
    Cache.remove(req.tokenId)
    return res.clearCookie('access_token').sendStatus(200)
  })
  app.get('/:id', validate(findSchema), BaseController.findOne)
  app.delete('/:id', validate(findSchema), BaseController.destroy)
  app.put('/:id', validate(findSchema), BaseController.patch)
}

export default router
