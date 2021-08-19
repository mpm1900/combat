import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Character } from '../../types/character/character'
import { ITEMS_BY_CHARACTER } from '../../types/character/data/ITEMS_BY_CHARACTER'
import { MOVES_BY_CHARACTER } from '../../types/character/data/MOVES_BY_CHARATER'
import { ALL_ITEMS } from '../../types/item/data/ALL_ITEMS'
import { Item } from '../../types/item/item'
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
  getMoveOptions: (id: string) => Move[]
  getItemList: (id: string) => Item[]
  getItemOptions: (id: string) => Item[]
}
const defaultValue: PartySystemContextValue = {
  activeCharacter: undefined,
  setActiveCharacterId: () => {},
  allCharacters: [],
  getCharacter: () => undefined,
  getMoveList: () => [],
  getMoveOptions: () => [],
  getItemList: () => [],
  getItemOptions: () => [],
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
  const getPartyCharacter = (id: string) => characters.find((c) => c.id === id)

  const getMoveList = (id: string) => {
    const char = getPartyCharacter(id)
    if (!char) return []
    const characterMoves = MOVES_BY_CHARACTER[char.characterId]
    if (!characterMoves) return ALL_MOVES
    const elementalMoves = char.elements
      .map((e) => e.moves)
      .reduce((result, moves) => {
        return [...result, ...moves]
      }, [])
    const itemMoves = char.items
      .map((i) => i.moves)
      .reduce((result, moves) => {
        return [...result, ...moves]
      }, [])
    return [...characterMoves, ...elementalMoves, ...itemMoves]
  }
  const getMoveOptions = (id: string) => {
    const char = getPartyCharacter(id)
    if (!char) return []
    return getMoveList(id).filter(
      (move) => !char.moves.map((m) => m.id).includes(move.id),
    )
  }

  const getItemList = (id: string) => {
    const char = getPartyCharacter(id)
    if (!char) return []
    return ITEMS_BY_CHARACTER[id] || ALL_ITEMS
  }
  const getItemOptions = (id: string) => {
    const char = getPartyCharacter(id)
    if (!char) return []
    return getItemList(id).filter(
      (item) => !char.items.map((m) => m.id).includes(item.id),
    )
  }

  const context: PartySystemContextValue = {
    activeCharacter,
    setActiveCharacterId,
    allCharacters: characterList,
    getCharacter,
    getMoveList,
    getMoveOptions,
    getItemList,
    getItemOptions,
  }
  return (
    <PartySystemContext.Provider value={context}>
      {children}
    </PartySystemContext.Provider>
  )
}
