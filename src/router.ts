import { App } from '@tinyhttp/app'

import BaseController from './services/index'
import { validate, AuthGuard } from './middlewares/index'
import findSchema from './schema/find'

const router = (app: App) => {
  /**
   * Auth Routes
   */
  app.get('/login', BaseController.login)
  app.get('/test-content', AuthGuard.guard, BaseController.protected)
  app.get('/test-logout', AuthGuard.guard, BaseController.logout)
  /**
   * Base Routes
   */
  app.get('/', BaseController.index)
  app.post('/', BaseController.store)
  app.get('/:id', validate(findSchema), BaseController.findOne)
  app.delete('/:id', validate(findSchema), BaseController.destroy)
  app.put('/:id', validate(findSchema), BaseController.patch)
}

export default router
