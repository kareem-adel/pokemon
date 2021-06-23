import React, { useEffect, useState as reactUseState } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { useState, useActions, useEffects, useReaction } from '../overmind'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Ripple } from 'react-spinners-css'
import ListGroup from 'react-bootstrap/ListGroup'

function Home () {
  const state = useState()
  const actions = useActions()
  const [windowHeight, setWindowHeight] = reactUseState(window.innerHeight)

  const fillScreen = async () => {
    const isFilled =
      Math.ceil(window.innerHeight) <
      document.getElementById('scrollableDiv').scrollHeight

    console.log({ isFilled })

    if (!isFilled && !!state.currentRetrievedPokemons.next) {
      await actions.getPokemons(state.currentRetrievedPokemons.next)
      fillScreen()
    }
  }

  const handleResize = () => {
    setWindowHeight(window.innerHeight)
    fillScreen()
  }

  useEffect(async () => {
    /*
    window.addEventListener('scroll', handleScroll, {
      passive: true
    })
    */
    window.addEventListener('resize', handleResize, {
      passive: true
    })

    await actions.getInitialPokemons()
    fillScreen()
    return () => {
      /*
      window.removeEventListener('scroll', handleScroll)
      */
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div
      id="scrollableDiv"
      style={{
        height: windowHeight,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        style={{ display: 'flex', flexDirection: 'column' }}
        dataLength={state.pokemons?.length}
        next={async () => {
          console.log('next')
          await actions.getPokemons(state.currentRetrievedPokemons.next)
        }}
        hasMore={!!state.currentRetrievedPokemons?.next}
        loader={<Ripple color="blue" size={30} />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>{"That's all !"}</b>
          </p>
        }
      >
        <ListGroup>
          {state.pokemons?.map((pokemon) => {
            const url = pokemon.url.split('/')
            const id = url[url.length - 2]
            return (
              <ListGroup.Item key={id} style={{ textAlign: 'center' }}>
                <Link
                  style={{ textDecoration: 'none' }}
                  onMouseOver={async () => {
                    await actions.preFetchPokemon(id)
                  }}
                  to={`/${id}`}
                >
                  <div>{`${id}`}</div>
                  <h5>{`${pokemon.name}`}</h5>
                </Link>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </InfiniteScroll>
    </div>
  )
}

export default Home

/*

  const [windowHeight, setWindowHeight] = reactUseState(window.innerHeight)

  const handleScroll = () => {
    return
    setWindowHeight(window.innerHeight)
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    if (bottom) {
      console.log('bottom')
      actions.getPokemons(state.currentRetrievedPokemons.next)
    }
  }

  const fillScreen = async () => {
    const isFilled =
      Math.ceil(window.innerHeight) <
      document.getElementById('scrollableDiv').scrollHeight

    console.log({ isFilled })

    if (!isFilled && !!state.currentRetrievedPokemons.next) {
      await actions.getPokemons(state.currentRetrievedPokemons.next)
      fillScreen()
    }
  }

<div
      id="scrollableDiv"
      style={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        height: windowHeight
      }}
    >
      {state.pokemons?.map((pokemon) => {
        const url = pokemon.url.split('/')
        const id = url[url.length - 2]
        return (
          <div key={id}>
            <Link to={`/${id}`}>{pokemon.name}</Link>
          </div>
        )
      })}
    </div>
*/
