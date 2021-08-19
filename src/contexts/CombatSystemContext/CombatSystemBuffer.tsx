import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 } from 'uuid'
import { useCombatSystem } from '.'
import { Character } from '../../types/character/character'
import { Move, MoveResult } from '../../types/move'
import { useCombatSystemTurn } from './CombatSystemTurn'

export type CombatSystemBufferContextValue = {
  moveBuffer: Move | undefined
  setMoveBuffer: (move: Move | undefined) => void
  bufferMove: (move: Move) => void
  targetsBuffer: Character[] | undefined
  setTargetsBuffer: (targets: Character[] | undefined) => void
  clearBuffers: () => void
  rolls: boolean[]
  setRolls: (r: boolean[]) => void
  moveResults: MoveResult[] | undefined
  setMoveResults: (r: MoveResult[]) => void
}
const defaultValue: CombatSystemBufferContextValue = {
  moveBuffer: undefined,
  setMoveBuffer: () => {},
  bufferMove: () => {},
  targetsBuffer: undefined,
  setTargetsBuffer: () => {},
  clearBuffers: () => {},
  rolls: [],
  setRolls: () => {},
  moveResults: undefined,
  setMoveResults: () => {},
}

export const CombatSystemBufferContext = createContext(defaultValue)
export const useCombatSystemBuffer = () => useContext(CombatSystemBufferContext)

export const CombatSystemBuffer = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { getTargets, activeCharacter } = useCombatSystem()
  const [moveBuffer, setMoveBuffer] = useState<Move | undefined>()
  const [targetsBuffer, setTargetsBuffer] = useState<Character[] | undefined>()
  const [rolls, setRolls] = useState<boolean[]>([])
  const [moveResults, setMoveResults] = useState<MoveResult[] | undefined>()

  const bufferMove = (move: Move) => {
    if (moveBuffer || !activeCharacter) return

    setMoveBuffer(move)

    const targets = getTargets(move, activeCharacter)
    if (targets.length === 1) {
      setTargetsBuffer(targets[0])
    }
  }
  const clearBuffers = () => {
    console.log('clearing results')
    setMoveBuffer(undefined)
    setTargetsBuffer(undefined)
    setMoveResults(undefined)
  }
  const context: CombatSystemBufferContextValue = {
    moveBuffer,
    setMoveBuffer,
    bufferMove,
    targetsBuffer,
    setTargetsBuffer,
    clearBuffers,
    rolls,
    setRolls,
    moveResults,
    setMoveResults,
  }

  return (
    <CombatSystemBufferContext.Provider value={context}>
      {children}
    </CombatSystemBufferContext.Provider>
  )
}
