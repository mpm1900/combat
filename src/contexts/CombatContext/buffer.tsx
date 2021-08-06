import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useCombat } from '.'
import { Character } from '../../types/character/character'
import { Move } from '../../types/move'

export type CombatBufferContextValue = {
  moveBuffer: Move | undefined
  setMoveBuffer: (move: Move | undefined) => void
  bufferMove: (move: Move) => void
  targetsBuffer: Character[] | undefined
  setTargetsBuffer: (targets: Character[] | undefined) => void
  clear: () => void
}
const defaultValue: CombatBufferContextValue = {
  moveBuffer: undefined,
  setMoveBuffer: () => {},
  bufferMove: () => {},
  targetsBuffer: undefined,
  setTargetsBuffer: () => {},
  clear: () => {},
}

export const CombatBufferContext =
  createContext<CombatBufferContextValue>(defaultValue)
export const useCombatBuffer = () => useContext(CombatBufferContext)

export const CombatBuffer = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { getTargets, getActiveCharacter } = useCombat()
  const [moveBuffer, setMoveBuffer] = useState<Move | undefined>()
  const [targetsBuffer, setTargetsBuffer] = useState<Character[] | undefined>()
  const bufferMove = (move: Move) => {
    setMoveBuffer(move)
    const character = getActiveCharacter()
    if (character) {
      const targets = getTargets(move, character)
      if (targets.length === 1) {
        setTargetsBuffer(targets[0])
      }
    }
  }
  const clear = () => {
    setMoveBuffer(undefined)
    setTargetsBuffer(undefined)
  }
  const context: CombatBufferContextValue = {
    moveBuffer,
    setMoveBuffer,
    bufferMove,
    targetsBuffer,
    setTargetsBuffer,
    clear,
  }
  return (
    <CombatBufferContext.Provider value={context}>
      {children}
    </CombatBufferContext.Provider>
  )
}
