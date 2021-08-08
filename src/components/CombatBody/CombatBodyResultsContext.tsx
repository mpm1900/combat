import { createContext, useContext } from 'react'

type CombatBodyResultsContextValue = {
  damageDone: boolean
  setDamageDone: (v: boolean) => void
  checksDone: boolean
  setChecksDone: (v: boolean) => void
}
const defaultValue: CombatBodyResultsContextValue = {
  damageDone: false,
  setDamageDone: () => {},
  checksDone: false,
  setChecksDone: () => {},
}
export const CombatBodyResultsContext = createContext(defaultValue)
export const useCombatBodyResults = () => useContext(CombatBodyResultsContext)
