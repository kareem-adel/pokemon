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
      <div><div>{JSON.stringify(state.selectedPokemon?.evolution)}</div>{JSON.stringify(state.selectedPokemon)}</div>
    </div>
  )
}
