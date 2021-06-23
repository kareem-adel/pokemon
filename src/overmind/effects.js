// Import dependencies
import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

export const api = (() => {
  const baseUrl = 'https://pokeapi.co/api/v2'
  const cache = setupCache({
    maxAge: 15 * 60 * 1000
  })
  const caxios = axios.create({
    adapter: cache.adapter
  })
  return {
    async getInitialPokemons () {
      const ret = await caxios({
        url: `${baseUrl}/pokemon?offset=0&limit=20`,
        method: 'get'
      })
      return ret.data
    },
    async getPokemons (url) {
      const ret = await caxios({
        url,
        method: 'get'
      })
      return ret.data
    },
    async getPokemon (id) {
      const ret = await caxios({
        url: `${baseUrl}/pokemon/${id}/`,
        method: 'get'
      })
      return ret.data
    },
    async getEvolution (id) {
      const ret = await caxios({
        url: `${baseUrl}/evolution-chain/${id}/`,
        method: 'get'
      }).catch(() => {
        return false
      })
      return ret.data
    }
  }
})()
