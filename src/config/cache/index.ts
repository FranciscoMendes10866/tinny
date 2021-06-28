import NodeCache from 'node-cache'

class CacheManager {
    private client: NodeCache
    constructor () {
      this.client = new NodeCache()
    }

    public set = (key: string, value: string, expiration: number): boolean => {
      return this.client.set(key, value, expiration)
    }

    public get = (key: string): string => {
      return this.client.get(key)
    }

    public remove = (key: string): number => {
      return this.client.del(key)
    }

    public stats = () => {
      return this.client.getStats()
    }
}

export default new CacheManager()
