import React from 'react'
import { useParams } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { useState, useActions, useEffects, useReaction } from '../overmind'

export default function Detail () {
  const { id } = useParams()
  return (
    <div>
      <div>{id}</div>
    </div>
  )
}
