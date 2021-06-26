import 'dotenv/config'

import router from './router'
import app from './app'

const { PORT, NODE_ENV } = process.env

const port: number = Number(PORT) || 3333
const host: string = NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

const start = () => {
  try {
    router(app)
    app.listen(port, () => {
      console.log(`Api up and running at: http://localhost:${port}`)
    }, host)
  } catch (err) {
    console.error(err)
    process.exit()
  }
}
start()
