import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { useState, useActions, useEffects, useReaction } from '../overmind'

function Home () {
  const state = useState()
  const actions = useActions()

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

    if (bottom) {
      console.log('at the bottom')
      actions.getPokemons(state.currentRetrievedPokemons.next)
    }
  }

  const fillScreen = async () => {
    const isFilled = Math.ceil(window.innerHeight) < document.getElementById('scrollableDiv').scrollHeight
    console.log({ isFilled })

    if (!isFilled && !!state.currentRetrievedPokemons.next) {
      await actions.getPokemons(state.currentRetrievedPokemons.next)
      fillScreen()
    }
  }

  useEffect(async () => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    })
    await actions.getInitialPokemons()
    fillScreen()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
        <div >
          {state.currentRetrievedPokemons.next}
            <div
              id="scrollableDiv"
              style={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
                {state.pokemons?.map((pokemon) => {
                  const url = pokemon.url.split('/')
                  const id = url[url.length - 2]
                  return <div key={id}><Link to={`/${id}`}>{pokemon.name}</Link></div>
                })}
            </div>
        </div>
  )
}

export default Home
