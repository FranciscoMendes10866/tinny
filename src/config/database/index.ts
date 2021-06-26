import { boomify } from '@hapi/boom'

import { findOneDTO } from './db.dto'
import { Users } from './manager'

class DatabaseManager {
  public findAll = async (): Promise<findOneDTO[]> => {
    try {
      return await Users.find()
    } catch (err) {
      throw boomify(err)
    }
  }

    public findOne = async (id: string): Promise<findOneDTO> => {
      try {
        return await Users.findOne({ _id: id })
      } catch (err) {
        throw boomify(err)
      }
    }

    public insertOne = async (name: string): Promise<findOneDTO> => {
      try {
        return await Users.insert({ name })
      } catch (err) {
        throw boomify(err)
      }
    }

    public deleteOne = async (id: string): Promise<findOneDTO> => {
      try {
        return await Users.findOneAndDelete({ _id: id })
      } catch (err) {
        throw boomify(err)
      }
    }

    public patchOne = async (id: string, body: findOneDTO): Promise<findOneDTO> => {
      try {
        return await Users.findOneAndUpdate({ _id: id }, { $set: { ...body } })
      } catch (err) {
        throw boomify(err)
      }
    }
}

export default new DatabaseManager()
