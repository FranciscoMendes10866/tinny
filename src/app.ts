import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import { cookieParser } from '@tinyhttp/cookie-parser'
import { cors } from '@tinyhttp/cors'
import { json } from 'milliparsec'

const app = new App()

app.use(logger())
app.use(cookieParser())
app.use(cors({ credentials: true }))
app.use(json())

export default app
