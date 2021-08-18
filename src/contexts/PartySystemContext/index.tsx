import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Character } from '../../types/character/character'
import { MOVES_BY_CHARACTER } from '../../types/character/data/MOVES_BY_CHARATER'
import { Move } from '../../types/move'
import { ALL_MOVES } from '../../types/move/data/ALL_MOVES'
import { usePlayer } from '../PlayerContext'
import { characterList } from './data'

export type PartySystemContextValue = {
  activeCharacter: Character | undefined
  setActiveCharacterId: (id: string) => void
  allCharacters: Character[]
  getCharacter: (id: string) => Character | undefined
  getMoveList: (id: string) => Move[]
}
const defaultValue: PartySystemContextValue = {
  activeCharacter: undefined,
  setActiveCharacterId: () => {},
  allCharacters: [],
  getCharacter: () => undefined,
  getMoveList: () => [],
}

export const PartySystemContext = createContext(defaultValue)
export const usePartySystem = () => useContext(PartySystemContext)

export const PartySystem = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { party } = usePlayer()
  const { characters } = party
  const [activeCharacterId, setActiveCharacterId] = useState<string>(
    characters[0]?.id,
  )
  const activeCharacter = useMemo(() => {
    return characters.find((c) => c.id === activeCharacterId)
  }, [characters, activeCharacterId])

  const getCharacter = (id: string) => characterList.find((c) => c.id === id)

  const getMoveList = (id: string) => MOVES_BY_CHARACTER[id] || ALL_MOVES

  const context: PartySystemContextValue = {
    activeCharacter,
    setActiveCharacterId,
    allCharacters: characterList,
    getCharacter,
    getMoveList,
  }
  return (
    <PartySystemContext.Provider value={context}>
      {children}
    </PartySystemContext.Provider>
  )
}
