import React, { useEffect, useState as reactUseState } from 'react'
import { useParams } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { useState, useActions, useEffects, useReaction } from '../overmind'

export default function Detail () {
  const actions = useActions()
  const state = useState()
  const { id } = useParams()
  const [windowHeight, setWindowHeight] = reactUseState(window.innerHeight)
  const handleResize = () => {
    setWindowHeight(window.innerHeight)
  }
  useEffect(async () => {
    window.addEventListener('resize', handleResize, {
      passive: true
    })
    await actions.getPokemon(id)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [id])
  return (
    <div style={{ height: windowHeight, overflow: 'auto' }}>
      <img src={state.selectedPokemon?.sprites?.front_default} />
      <h1>{state.selectedPokemon?.name}</h1>
      {state.selectedPokemon?.types?.map((type, index) => {
        return (
          <div key={index}>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div style={{ marginRight: 8 }}>{'Slot'}</div>
              <div>{type.slot}</div>
            </div>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div style={{ marginRight: 8 }}>{'Name'}</div>
              <div>{type.type?.name}</div>
            </div>
          </div>
        )
      })}
      {state.selectedPokemon?.stats?.map((type, index) => {
        return (
          <div key={index}>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div style={{ marginRight: 8 }}>{'Name'}</div>
              <div>{type.stat?.name}</div>
            </div>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div style={{ marginRight: 8 }}>{'base_stat'}</div>
              <div>{type.base_stat}</div>
            </div>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div style={{ marginRight: 8 }}>{'effort'}</div>
              <div>{type.effort}</div>
            </div>
          </div>
        )
      })}
      {!!state.selectedPokemon?.evolution?.chain?.evolves_to[0]?.species
        ?.name && (
        <div>
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <div style={{ marginRight: 8 }}>{'Evolution'}</div>
            <div>
              {
                state.selectedPokemon?.evolution?.chain?.evolves_to[0]?.species
                  ?.name
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
/* <div><div>{JSON.stringify(state.selectedPokemon?.evolution)}</div>{JSON.stringify(state.selectedPokemon)}</div> */
