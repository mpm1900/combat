import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 } from 'uuid'
import { useCombatSystem } from '.'
import { Box } from '../../components/_core/Box'
import { Spacer } from '../../components/_core/Spacer'
import { useLogs } from '../LogsContext'
import { useCombatSystemBuffer } from './CombatSystemBuffer'
import { useCombatSystemValidation } from './CombatSystemValidation'

export type CombatSystemTurnContextValue = {
  turnId: string
  turnCount: number
  nextTurn: () => void
}
const defaultValue: CombatSystemTurnContextValue = {
  turnId: v4(),
  turnCount: 0,
  nextTurn: () => {},
}

export const CombatSystemTurnContext = createContext(defaultValue)
export const useCombatSystemTurn = () => useContext(CombatSystemTurnContext)

export const CombatSystemTurn = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { push } = useLogs()
  const [turnId, setTurnId] = useState<string>(v4())
  const [turnCount, setTurnCount] = useState(0)
  const {
    activeCharacter,
    queue,
    enqueue,
    reduceStatusDurations,
    updateCharacter,
  } = useCombatSystem()
  const { moveBuffer, clearBuffers } = useCombatSystemBuffer()
  const { validationComplete, validateParties, reset } =
    useCombatSystemValidation()

  const nextTurn = () => {
    setTurnId(v4())
    setTurnCount((c) => c + 1)
  }
  const context: CombatSystemTurnContextValue = {
    turnId,
    turnCount,
    nextTurn,
  }

  useEffect(() => {
    if (turnCount > 0) {
      validateParties()
    }
    push(
      <Box flexDirection='row' alignItems='center' flex='1'>
        <Box
          paddingRight='4px'
          color='rgba(255,255,255,0.36)'
          style={{
            fontSize: '12px',
            fontWeight: 900,
            textTransform: 'uppercase',
          }}
        >
          Turn {turnCount + 1}
        </Box>
        <Spacer margin='8px 0 8px 4px' />
      </Box>,
    )
  }, [turnCount])

  useEffect(() => {
    if (validationComplete) {
      console.log('validation complete, pass')
      reset()
      reduceStatusDurations()
      enqueue(moveBuffer?.recovery || 0)
      clearBuffers()
    }
  }, [validationComplete, moveBuffer])

  useEffect(() => {
    if (activeCharacter) {
      updateCharacter(activeCharacter.id, (c) => ({
        ...c,
        statuses: c.statuses.filter((s) => !s.removeOnActiveTurnStart),
      }))
    }
  }, [activeCharacter?.id, turnId])

  return (
    <CombatSystemTurnContext.Provider value={context}>
      {children}
    </CombatSystemTurnContext.Provider>
  )
}
