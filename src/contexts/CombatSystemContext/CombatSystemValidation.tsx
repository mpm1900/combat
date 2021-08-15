import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useCombatSystem } from '.'
import { getStats } from '../../types/character/util'

export type CombatSystemValidationContextValue = {
  validationComplete: boolean
  validateParties: () => void
  reset: () => void
}
const defaultValue: CombatSystemValidationContextValue = {
  validationComplete: false,
  validateParties: () => {},
  reset: () => {},
}

export const CombatSystemValidationContext = createContext(defaultValue)
export const useCombatSystemValidation = () =>
  useContext(CombatSystemValidationContext)

export const CombatSystemValidation = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const {
    partyIds,
    activeCharacters,
    getActiveCharacters,
    getBenchCharacters,
    getCharacterStats,
    getLiveCharacters,
    substituteCharacters,
  } = useCombatSystem()
  const [
    activeCharacterValidationComplete,
    setActiveCharacterValidationComplete,
  ] = useState(false)

  const [
    benchCharacterValidationComplete,
    setBenchCharacterValidationComplete,
  ] = useState(false)

  const validationComplete =
    activeCharacterValidationComplete && benchCharacterValidationComplete

  const validateActiveCharactersHealth = () => {
    activeCharacters.forEach((c) => {
      const stats = getCharacterStats(c.id)
      if (stats.healthRatio <= 0) {
        substituteCharacters(c.id, '')
      }
    })
    setActiveCharacterValidationComplete(true)
  }

  const validateActiveCharacterState = () => {
    partyIds.forEach((partyId) => {
      const actives = getActiveCharacters(partyId)
      const bench = getBenchCharacters(partyId)
      const countToFill = 3 - actives.length
      const liveBenchCharacters = getLiveCharacters(bench)
      const liveBenchCharactersToFill = liveBenchCharacters.slice(
        0,
        countToFill,
      )

      liveBenchCharactersToFill.forEach((b) => {
        if (b) {
          substituteCharacters('', b.id)
        }
      })
    })
    setBenchCharacterValidationComplete(true)
  }

  useEffect(() => {
    if (activeCharacterValidationComplete) {
      validateActiveCharacterState()
    }
  }, [activeCharacterValidationComplete])

  const validateParties = () => {
    validateActiveCharactersHealth()
  }

  const reset = () => {
    setActiveCharacterValidationComplete(false)
    setBenchCharacterValidationComplete(false)
  }

  const context: CombatSystemValidationContextValue = {
    validationComplete,
    validateParties,
    reset,
  }
  return (
    <CombatSystemValidationContext.Provider value={context}>
      {children}
    </CombatSystemValidationContext.Provider>
  )
}
