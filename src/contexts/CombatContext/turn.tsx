import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 } from 'uuid'
import { useCombat } from '.'
import { useCombatBuffer } from './buffer'

export type CombatTurnContextValue = {
  turnId: string
  turnCount: number
  nextTurn: () => void
}
const defaultValue: CombatTurnContextValue = {
  turnId: v4(),
  turnCount: 0,
  nextTurn: () => {},
}

export const CombatTurnContext = createContext(defaultValue)
export const useCombatTurn = () => useContext(CombatTurnContext)

export const CombatTurn = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const [turnId, setTurnId] = useState<string>(v4())
  const [turnCount, setTurnCount] = useState(0)
  const { enqueue, reduceStatusDurations } = useCombat()
  const { clear, moveBuffer } = useCombatBuffer()
  const nextTurn = () => {
    setTurnId(v4())
    setTurnCount((c) => c + 1)
  }
  const context: CombatTurnContextValue = {
    turnId,
    turnCount,
    nextTurn,
  }

  useEffect(() => {
    if (turnId && turnCount > 0 && moveBuffer) {
      reduceStatusDurations()
      enqueue(moveBuffer)
      clear()
    }
  }, [turnCount])

  return (
    <CombatTurnContext.Provider value={context}>
      {children}
    </CombatTurnContext.Provider>
  )
}
