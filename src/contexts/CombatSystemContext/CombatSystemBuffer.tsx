import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useCombatSystem } from '.'
import { Character } from '../../types/character/character'
import { Move } from '../../types/move'
import { useLogs } from '../LogsContext'

export type CombatSystemBufferContextValue = {
  moveBuffer: Move | undefined
  setMoveBuffer: (move: Move | undefined) => void
  bufferMove: (move: Move) => void
  targetsBuffer: Character[] | undefined
  setTargetsBuffer: (targets: Character[] | undefined) => void
  clear: () => void
}
const defaultValue: CombatSystemBufferContextValue = {
  moveBuffer: undefined,
  setMoveBuffer: () => {},
  bufferMove: () => {},
  targetsBuffer: undefined,
  setTargetsBuffer: () => {},
  clear: () => {},
}

export const CombatSystemBufferContext = createContext(defaultValue)
export const useCombatSystemBuffer = () => useContext(CombatSystemBufferContext)

export const CombatSystemBuffer = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { push } = useLogs()
  const { getTargets, activeCharacter } = useCombatSystem()
  const [moveBuffer, setMoveBuffer] = useState<Move | undefined>()
  const [targetsBuffer, setTargetsBuffer] = useState<Character[] | undefined>()

  const bufferMove = (move: Move) => {
    push(`${move.name} selected.`)
    setMoveBuffer(move)
    if (activeCharacter) {
      const targets = getTargets(move, activeCharacter)
      if (targets.length === 1) {
        setTargetsBuffer(targets[0])
      }
    }
  }
  const clear = () => {
    setMoveBuffer(undefined)
    setTargetsBuffer(undefined)
  }
  const context: CombatSystemBufferContextValue = {
    moveBuffer,
    setMoveBuffer,
    bufferMove,
    targetsBuffer,
    setTargetsBuffer,
    clear,
  }

  useEffect(() => {
    if (activeCharacter) {
      clear()
    }
  }, [activeCharacter?.id])

  return (
    <CombatSystemBufferContext.Provider value={context}>
      {children}
    </CombatSystemBufferContext.Provider>
  )
}
