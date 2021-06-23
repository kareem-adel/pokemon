import { createOvermindMock } from 'overmind'
import { config } from '../../src/overmind/index'

describe('Actions', () => {
  describe('getInitialPokemons', () => {
    it('should get pokemons without url', async () => {
      const overmind = createOvermindMock(config, {
        api: {
          getInitialPokemons () {
            return Promise.resolve({
              results: [
                {
                  name: 'pokemon',
                  url: 'example.com'
                }
              ]
            })
          }
        }
      })

      await overmind.actions.getInitialPokemons()

      expect(overmind.state.currentRetrievedPokemons.results).to.deep.equal([
        {
          name: 'pokemon',
          url: 'example.com'
        }
      ])
    })
  })
})

describe('Actions', () => {
  describe('getPokemons', () => {
    it('should get pokemons with url', async () => {
      const overmind = createOvermindMock(config, {
        api: {
          getPokemons (url) {
            return Promise.resolve({
              results: [
                {
                  name: 'pokemon',
                  url: 'example.com'
                }
              ]
            })
          }
        }
      })

      await overmind.actions.getPokemons('example.com')

      expect(overmind.state.currentRetrievedPokemons.results).to.deep.equal([
        {
          name: 'pokemon',
          url: 'example.com'
        }
      ])
    })
  })
})

describe('Actions', () => {
  describe('getPokemon', () => {
    it('should get pokemon with passed id', async () => {
      const overmind = createOvermindMock(config, {
        api: {
          getPokemon (id) {
            return Promise.resolve({
              id,
              name: 'pokemon'
            })
          },
          getEvolution (id) {
            return Promise.resolve({
              id
            })
          }
        }
      })

      await overmind.actions.getPokemon(1)

      expect(overmind.state.selectedPokemon).to.deep.contain({
        id: 1,
        name: 'pokemon'
      })
      expect(overmind.state.selectedPokemon.evolution).to.deep.equal({ id: 1 })
    })
  })
})

describe('Actions', () => {
  describe('clearPokemon', () => {
    it('should clear selected pokemon', async () => {
      const overmind = createOvermindMock(config)

      await overmind.actions.clearPokemon()

      expect(overmind.state.selectedPokemon).to.deep.equal({})
    })
  })
})
