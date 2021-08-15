import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useCombatSystem } from '.'
import { usePlayer } from '../PlayerContext'

export type CombatSystemValidationContextValue = {
  validationComplete: boolean
  benchCharactersToAdd: number
  validateParties: () => void
  activateCharacter: (id: string) => void
  reset: () => void
}
const defaultValue: CombatSystemValidationContextValue = {
  validationComplete: false,
  benchCharactersToAdd: 0,
  validateParties: () => {},
  activateCharacter: () => {},
  reset: () => {},
}

export const CombatSystemValidationContext = createContext(defaultValue)
export const useCombatSystemValidation = () =>
  useContext(CombatSystemValidationContext)

export const CombatSystemValidation = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { party } = usePlayer()
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

  const [benchCharactersToAdd, setBenchCharactersToAdd] = useState(0)

  const validationComplete =
    activeCharacterValidationComplete &&
    benchCharacterValidationComplete &&
    benchCharactersToAdd === 0

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
      if (partyId !== party.id) {
        liveBenchCharactersToFill.forEach((b) => {
          if (b) {
            substituteCharacters('', b.id)
          }
        })
      } else {
        setBenchCharactersToAdd(
          liveBenchCharactersToFill.filter((c) => c !== undefined).length,
        )
      }
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

  const activateCharacter = (id: string) => {
    substituteCharacters('', id)
    setBenchCharactersToAdd((n) => n - 1)
  }

  const reset = () => {
    setActiveCharacterValidationComplete(false)
    setBenchCharacterValidationComplete(false)
    setBenchCharactersToAdd(0)
  }

  const context: CombatSystemValidationContextValue = {
    validationComplete,
    benchCharactersToAdd,
    validateParties,
    activateCharacter,
    reset,
  }
  return (
    <CombatSystemValidationContext.Provider value={context}>
      {children}
    </CombatSystemValidationContext.Provider>
  )
}
