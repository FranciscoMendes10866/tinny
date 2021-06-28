import { Request, Response } from '@tinyhttp/app'

import { Database, Cache } from '../config/index'
import { AuthGuard } from '../middlewares/index'

class BaseController {
    public index = async (req: Request, res: Response): Promise<Response> => {
      const users = await Database.findAll()
      return res.status(200).json({ users })
    }

    public store = async (req: Request, res: Response): Promise<Response> => {
      const saved = await Database.insertOne(req.body.name)
      return res.status(201).json({ user: saved })
    }

    public findOne = async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params
      const user = await Database.findOne(id)
      return res.status(200).json({ user })
    }

    public destroy = async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params
      const user = await Database.deleteOne(id)
      return res.status(200).json({ user })
    }

    public patch = async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params
      const user = await Database.patchOne(id, req.body)
      return res.status(200).json({ user })
    }

    public login = (req: Request, res: Response): Response => {
      const data = { _id: 'qwerty' }
      const key = AuthGuard.generateToken(data)
      return res.cookie('node_key', key, { httpOnly: true, secure: false }).sendStatus(200)
    }

    public protected = async (req: Request, res: Response): Promise<Response> => {
      return res.json({ message: 'can access' })
    }

    public logout = async (req: Request, res: Response): Promise<Response> => {
      Cache.remove(req.cookies.node_key)
      return res.clearCookie('node_key').sendStatus(200)
    }
}

export default new BaseController()
