export const getInitialPokemons = async ({ state, effects, actions }) => {
  if (!state.loadingPokemons) {
    state.loadingPokemons = true
    state.currentRetrievedPokemons = await effects.api.getInitialPokemons()
    state.pokemons = [
      ...state.pokemons,
      ...state.currentRetrievedPokemons.results
    ]
    state.loadingPokemons = false
  }
}
export const getPokemons = async ({ state, effects, actions }, url) => {
  if (!state.loadingPokemons) {
    state.loadingPokemons = true
    state.currentRetrievedPokemons = await effects.api.getPokemons(url)
    state.pokemons = [
      ...state.pokemons,
      ...state.currentRetrievedPokemons.results
    ]
    state.loadingPokemons = false
  }
}
export const getPokemon = async ({ state, effects, actions }, id) => {
  state.selectedPokemon = await effects.api.getPokemon(id)
  console.log({ selectedPokemon: state.selectedPokemon })
  state.selectedPokemon.evolution = await effects.api.getEvolution(id)
}

export const preFetchPokemon = async ({ state, effects, actions }, id) => {
  await effects.api.getPokemon(id)
}
