import { useMemo, useState } from 'react'
import { CombatSystemCharacter } from './types'

export const useCombatSystemCharacters = () => {
  const [characters, setCharacters] = useState<CombatSystemCharacter[]>([])

  const getCharacters = (partyId: string) =>
    characters.filter((c) => c.partyId === partyId)
  const getCharacter = (id: string) => characters.find((c) => c.id === id)
  const hydrateCharacterIds = (ids: string[]): CombatSystemCharacter[] =>
    ids
      .map(getCharacter)
      .filter((c) => c !== undefined) as CombatSystemCharacter[]

  const activeCharacters = useMemo(
    () => characters.filter((c) => c.isActiveCharacter),
    [characters],
  )
  const benchCharacters = useMemo(
    () => characters.filter((c) => !c.isActiveCharacter),
    [characters],
  )

  const getActiveCharacters = (partyId: string) =>
    activeCharacters.filter((c) => c.partyId === partyId)

  const getBenchCharacters = (partyId: string) =>
    benchCharacters.filter((c) => c.partyId === partyId)

  const removeActiveCharacter = (id: string) => {
    setCharacters((list) =>
      list.map((c) =>
        c.id === id
          ? {
              ...c,
              isActiveCharacter: false,
              statuses: c.statuses.filter((c) => !c.removeOnBench),
            }
          : c,
      ),
    )
  }

  const addActiveCharacter = (id: string) => {
    setCharacters((list) =>
      list.map((c) => (c.id === id ? { ...c, isActiveCharacter: true } : c)),
    )
  }

  return {
    characters,
    activeCharacters,
    benchCharacters,
    getCharacter,
    getCharacters,
    setCharacters,
    hydrateCharacterIds,
    getActiveCharacters,
    getBenchCharacters,
    addActiveCharacter,
    removeActiveCharacter,
  }
}
