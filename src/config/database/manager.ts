import monk, { IMonkManager } from 'monk'

const { NODE_ENV } = process.env

const manager: Promise<IMonkManager> & IMonkManager = NODE_ENV === 'production'
  ? monk('mongodb://root:root@localhost:27017/tinny?authSource=admin')
  : monk('mongodb://root:root@localhost:27017/tinny-test?authSource=admin')

export const Users = manager.get('users')
