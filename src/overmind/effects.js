// Import dependencies
import { setupCache } from 'axios-cache-adapter'

export const api = (() => {
  let axios

  return {
    initialize () {
      const cache = setupCache({
        maxAge: 15 * 60 * 1000
      })
      axios = axios.create({
        adapter: cache.adapter
      })
    },
    async getItems () {
      const ret = await axios({
        url: 'http://localhost/3000',
        method: 'get'
      })

      return ret.data
    }
  }
})()
