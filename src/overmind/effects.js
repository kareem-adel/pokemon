// Import dependencies
import { setupCache } from 'axios-cache-adapter'

export const api = (() => {
  let axios
  const baseUrl = 'https://pokeapi.co/api/v2'

  return {
    initialize () {
      const cache = setupCache({
        maxAge: 15 * 60 * 1000
      })
      axios = axios.create({
        adapter: cache.adapter
      })
    },
    async getPokemons (index, offset = 20) {
      const ret = await axios({
        url: `${baseUrl}/pokemon?offset=${index}&limit=${offset}`,
        method: 'get'
      })
      return JSON.parse(ret.data)
    },
    async getPokemon (id) {
      const ret = await axios({
        url: `${baseUrl}/pokemon/${id}/`,
        method: 'get'
      })
      return JSON.parse(ret.data)
    },
    async getEvolution (id) {
      const ret = await axios({
        url: `${baseUrl}/evolution-chain/${id}/`,
        method: 'get'
      })
      return JSON.parse(ret.data)
    }
  }
})()
