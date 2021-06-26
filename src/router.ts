import { App } from '@tinyhttp/app'

import BaseController from './services/index'
import validate from './middlewares/validate'
import findSchema from './schema/find'

const router = (app: App) => {
  app.get('/', BaseController.index)
  app.post('/', BaseController.store)
  app.get('/:id', validate(findSchema), BaseController.findOne)
  app.delete('/:id', validate(findSchema), BaseController.destroy)
  app.put('/:id', validate(findSchema), BaseController.patch)
}

export default router
