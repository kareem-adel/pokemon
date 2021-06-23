import { createOvermindMock } from 'overmind'
import { config } from '../../src/overmind/index'

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

      expect(overmind.state.selectedPokemon.name).equal('pokemon')
    })
  })
})
