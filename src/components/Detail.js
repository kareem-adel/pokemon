import React, { useEffect, useState as reactUseState } from 'react'
import { useParams } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { useState, useActions, useEffects, useReaction } from '../overmind'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Ripple } from 'react-spinners-css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

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
    actions.clearPokemon()
    await actions.getPokemon(id)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [id])
  return (
    <div
      style={{
        height: windowHeight,
        overflow: 'auto',
        flexDirection: 'column',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16,
        paddingTop: 16

      }}
    >
      <LazyLoadImage
        style={{ alignSelf: 'center' }}
        height={96}
        width={96}
        src={state.selectedPokemon?.sprites?.front_default}
        placeholderSrc={'https://via.placeholder.com/96X96.png?text=Avatar'}
      />

      <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <h1>{state.selectedPokemon?.name}</h1>

        {(() => {
          switch (state.selectedPokemon?.evolution) {
            case undefined:
              return (
                <div>
                  <Ripple color="blue" size={16} />
                </div>
              )
            default:
              return (
                !!state.selectedPokemon?.evolution.chain?.evolves_to[0]?.species
                  ?.name &&
                <h4>{`Evolves to ${state.selectedPokemon?.evolution?.chain?.evolves_to[0]?.species?.name}`}</h4>
              )
          }
        })()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>

      {!!state.selectedPokemon?.stats && (
        <Card style={{ width: '18rem', marginBottom: 16 }}>
          <Card.Header>Stats</Card.Header>
          <ListGroup variant="flush">
            {state.selectedPokemon?.stats?.map((stat, index) => {
              return (
                <ListGroup.Item
                  key={index}
                >{`${stat.stat?.name} (base ${stat.base_stat}) (effort ${stat.effort})`}</ListGroup.Item>
              )
            })}
          </ListGroup>
        </Card>
      )}
      {!!state.selectedPokemon?.types && (
        <Card style={{ width: '18rem' }}>
          <Card.Header>Types</Card.Header>
          <ListGroup variant="flush">
            {state.selectedPokemon?.types?.map((type, index) => {
              return (
                <ListGroup.Item
                  key={index}
                >{`${type.type?.name} (slot ${type.slot})`}</ListGroup.Item>
              )
            })}
          </ListGroup>
        </Card>
      )}
      </div>
    </div>
  )
}
