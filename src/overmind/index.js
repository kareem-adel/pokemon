import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook
} from 'overmind-react'

export const config = {
  state,
  actions,
  effects
}

export const useState = createStateHook()
export const useActions = createActionsHook()
export const useEffects = createEffectsHook()
export const useReaction = createReactionHook()
