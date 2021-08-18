import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { v4 } from 'uuid'
import { Blastoise } from '../../types/character/data/entities/blastoise'
import { Mew } from '../../types/character/data/entities/mew'
import { Charizard } from '../../types/character/data/entities/charizard'
import { Venusaur } from '../../types/character/data/entities/venusaur'
import { Party } from '../../types/character/party'
import { Character } from '../../types/character/character'

const defaultParty = (): Party => ({
  id: v4(),
  characters: [Charizard(), Mew(), Blastoise(), Venusaur()],
})

export type PlayerContextValue = {
  party: Party
  setParty: (p: Party) => void
  updateCharacter: (id: string, fn: (c: Character) => Character) => void
}
const defaultValue: PlayerContextValue = {
  party: defaultParty(),
  setParty: () => {},
  updateCharacter: () => {},
}

export const PlayerContext = createContext(defaultValue)
export const usePlayer = () => useContext(PlayerContext)

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const [party, setParty] = useState<Party>(defaultParty())
  const updateCharacter = (id: string, fn: (c: Character) => Character) => {
    setParty((p) => ({
      ...p,
      characters: p.characters.map((c) => (c.id === id ? fn(c) : c)),
    }))
  }

  const context: PlayerContextValue = {
    party,
    setParty,
    updateCharacter,
  }
  return (
    <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
  )
}
