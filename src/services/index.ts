import { Request, Response } from '@tinyhttp/app'

import { Database } from '../config/index'

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
}

export default new BaseController()
