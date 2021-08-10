import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Character } from '../../types/character/character'
import { Party } from '../../types/character/party'
import { getStats } from '../../types/character/util'
import { Move } from '../../types/move'
import { getActiveId, Queue } from '../../types/queue/queue'
import { ResolvedStatus, Status } from '../../types/status/status'
import { usePlayer } from '../PlayerContext'
import { CombatBuffer } from './buffer'
import { getTargetIds } from './getTargets'
import { CombatTurn } from './turn'
import { CombatParty } from './types'
import { useQueue } from './useQueue'

export type CombatContextValue = {
  queue: Queue
  parties: Party[]
  characters: Character[]
  init: (party: Party) => void
  getCharacter: (id: string) => Character | undefined
  getCharacterPartyId: (id: string) => string | undefined
  getLiveCharacters: () => Character[]
  isCharacterPlayerCharacter: (id: string) => boolean
  getActiveCharacter: () => Character | undefined
  hydrateCharacterIds: (ids: string[]) => Character[]
  getTargets: (move: Move, source: Character) => Character[][]
  updateCharacter: (id: string, fn: (c: Character) => Character) => void
  addDamageToCharacter: (id: string, damage: number) => void
  addStatusesToCharacter: (id: string, statuses: ResolvedStatus[]) => void
  reduceStatusDurations: () => void
  enqueue: (move: Move) => void
}
const defaultValue: CombatContextValue = {
  queue: [],
  parties: [],
  characters: [],
  init: () => {},
  getCharacter: () => undefined,
  getCharacterPartyId: () => undefined,
  getLiveCharacters: () => [],
  isCharacterPlayerCharacter: () => false,
  getActiveCharacter: () => undefined,
  hydrateCharacterIds: () => [],
  getTargets: () => [],
  updateCharacter: () => {},
  addDamageToCharacter: () => {},
  addStatusesToCharacter: () => {},
  reduceStatusDurations: () => {},
  enqueue: () => {},
}

export const CombatContext = createContext<CombatContextValue>(defaultValue)
export const useCombat = () => useContext(CombatContext)

export const CombatContextProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { party } = usePlayer()
  const [parties, setParties] = useState<CombatParty[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const { queue, enqueue, initialize } = useQueue([])
  const updateCharacter = (id: string, fn: (c: Character) => Character) => {
    setCharacters((chars) => chars.map((c) => (c.id === id ? fn(c) : c)))
  }
  const addDamageToCharacter = (id: string, damage: number) =>
    updateCharacter(id, (c) => ({ ...c, damage: c.damage + damage }))

  const addStatusesToCharacter = (id: string, statuses: ResolvedStatus[]) => {
    const statusesToApply = statuses.filter((status) => status.isApplied)

    updateCharacter(id, (c) => {
      let oldStatuses = [...c.statuses]
      statusesToApply.forEach((status) => {
        if (!status.isStackable) {
          oldStatuses = oldStatuses.filter(
            (s) => s.statusId !== status.statusId,
          )
        }
      })
      return { ...c, statuses: [...oldStatuses, ...statusesToApply] }
    })
  }

  const reduceStatusDurations = () => {
    characters.forEach((character) => {
      updateCharacter(character.id, (c) => ({
        ...c,
        statuses: c.statuses
          .map((status) => ({
            ...status,
            duration: status.duration - 1,
          }))
          .filter((status) => status.duration !== 0),
      }))
    })
  }

  const hydrateCharacterIds = (ids: string[]): Character[] =>
    ids
      .map((id) => characters.find((c) => c.id === id))
      .filter((c) => c !== undefined) as Character[]

  const getCharacter = (id: string) =>
    hydrateCharacterIds([id])[0] as Character | undefined

  const getCharacterPartyId = (id: string) =>
    parties.find((p) => p.characterIds.includes(id))?.id

  const getLiveCharacters = () => hydrateCharacterIds(queue.map((q) => q.id))

  const isCharacterPlayerCharacter = (id: string) =>
    getCharacterPartyId(id) === party.id

  const getActiveCharacter = () => getCharacter(getActiveId(queue))

  const getTargets = (move: Move, source: Character) => {
    const targetIds = getTargetIds(move, source, parties)
    if (targetIds.length === 0)
      throw new Error('Invalid Battle state. [getTargets]')
    return targetIds
      .map((ids) => hydrateCharacterIds(ids))
      .map((chars) => chars.filter((c) => c.damage < getStats(c).health))
      .filter((chars) => chars.length > 0)
  }

  const init = (p: Party) => {
    const initParties = [party, p]
    setParties(
      initParties.map((party) => ({
        id: party.id,
        characterIds: party.characters.map((c) => c.id),
      })),
    )
    const chars = initParties.reduce(
      (result, party) => [...result, ...party.characters],
      [] as Character[],
    )
    setCharacters(chars)
    initialize(chars)
  }

  const contextParties = useMemo(() => {
    return parties.map((party) => ({
      id: party.id,
      characters: party.characterIds
        .map((id) => characters.find((c) => c.id === id))
        .filter((c) => c !== undefined) as Character[],
    }))
  }, [parties, characters])

  const context: CombatContextValue = {
    queue,
    parties: contextParties,
    characters,
    init,
    getCharacter,
    getCharacterPartyId,
    getLiveCharacters,
    isCharacterPlayerCharacter,
    getActiveCharacter,
    hydrateCharacterIds,
    getTargets,
    updateCharacter,
    addDamageToCharacter,
    addStatusesToCharacter,
    reduceStatusDurations,
    enqueue: (move: Move) => enqueue(characters, move),
  }

  return (
    <CombatContext.Provider value={context}>
      <CombatBuffer>
        <CombatTurn>{children}</CombatTurn>
      </CombatBuffer>
    </CombatContext.Provider>
  )
}
