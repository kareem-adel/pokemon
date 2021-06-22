export const getInitialPokemons = async ({ state, effects, actions }) => {
  if (!state.loadingPokemons) {
    state.loadingPokemons = true
    state.currentRetrievedPokemons = await effects.api.getInitialPokemons()
    state.pokemons = [...state.pokemons, ...(state.currentRetrievedPokemons).results]
    state.loadingPokemons = false
  }
}
export const getPokemons = async ({ state, effects, actions }, url) => {
  if (!state.loadingPokemons) {
    state.loadingPokemons = true
    state.currentRetrievedPokemons = await effects.api.getPokemons(url)
    state.pokemons = [...state.pokemons, ...(state.currentRetrievedPokemons).results]
    state.loadingPokemons = false
  }
}
export const getPokemon = async ({ state, effects, actions }, id) => {
  state.currentPokemon = await effects.api.getPokemon(id)
  state.currentPokemon.evolution = await effects.api.getEvolution(id)
}
