import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { v4 } from 'uuid'
import { Blastoise } from '../../types/character/data/entities/blastoise'
import { Charizard } from '../../types/character/data/entities/charizard'
import { Golem } from '../../types/character/data/entities/golem'
import { Venusaur } from '../../types/character/data/entities/venusaur'
import { Party } from '../../types/character/party'

const defaultParty = (): Party => ({
  id: v4(),
  characters: [Charizard(), Venusaur(), Blastoise()],
})

export type PlayerContextValue = {
  party: Party
  setParty: (p: Party) => void
}
const defaultValue: PlayerContextValue = {
  party: defaultParty(),
  setParty: () => {},
}

export const PlayerContext = createContext(defaultValue)
export const usePlayer = () => useContext(PlayerContext)

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const [party, setParty] = useState<Party>(defaultParty())

  const context: PlayerContextValue = {
    party,
    setParty,
  }
  return (
    <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
  )
}
