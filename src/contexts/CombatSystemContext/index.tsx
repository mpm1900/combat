import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  Character,
  ResolvedCharacterStats,
} from '../../types/character/character'
import { Party } from '../../types/character/party'
import { getStats } from '../../types/character/util'
import { Move } from '../../types/move'
import { getActiveId, Queue, QueueItem } from '../../types/queue/queue'
import { useQueue } from './useQueue'
import { usePlayer } from '../PlayerContext'
import { getTargetIds } from './getTargets'
import { CombatSystemCharacter } from './types'
import { useCombatSystemCharacters } from './useCombatSystemCharacters'
import { useCombatSystemStats } from './useCombatSystemStats'
import { convertToCombatSystemCharacter } from './util'
import { ResolvedStatus } from '../../types/status/status'
import { CombatSystemBuffer } from './CombatSystemBuffer'
import { ZERO_STATS } from '../../types/character/data/ZERO_STATS'
import { CombatSystemValidation } from './CombatSystemValidation'
import { CombatSystemTurn } from './CombatSystemTurn'
import { useLogs } from '../LogsContext'

export type CombatSystemContextValue = {
  queue: Queue
  partyIds: string[]
  characters: CombatSystemCharacter[]
  activeCharacter: CombatSystemCharacter | undefined
  activeCharacters: CombatSystemCharacter[]
  benchCharacters: CombatSystemCharacter[]
  initialized: boolean
  init: (enemyParty: Party) => void
  enqueue: (recovery: number) => void
  getCharacter: (id: string) => CombatSystemCharacter | undefined
  getCharacters: (partyId: string) => CombatSystemCharacter[]
  getCharacterStats: (id: string) => ResolvedCharacterStats
  getActiveCharacters: (partyId: string) => CombatSystemCharacter[]
  getBenchCharacters: (partyId: string) => CombatSystemCharacter[]
  getLiveCharacters: (
    characters: CombatSystemCharacter[],
  ) => CombatSystemCharacter[]
  getTargets: (
    move: Move,
    source: CombatSystemCharacter,
  ) => CombatSystemCharacter[][]
  hydrateCharacterIds: (ids: string[]) => Character[]
  updateCharacter: (
    id: string | undefined,
    fn: (c: CombatSystemCharacter) => CombatSystemCharacter,
  ) => void
  updateQueueItemById: (id: string, fn: (qi: QueueItem) => QueueItem) => void
  isCharacterPlayerCharacter: (id: string) => boolean
  substituteCharacters: (activeId: string, benchId: string) => void
  addDamageToCharacter: (id: string, damage: number) => void
  addStatusesToCharacter: (id: string, statuses: ResolvedStatus[]) => void
  reduceStatusDurations: () => void
}

const defaultValue: CombatSystemContextValue = {
  queue: [],
  partyIds: [],
  characters: [],
  activeCharacter: undefined,
  activeCharacters: [],
  benchCharacters: [],
  initialized: false,
  init: () => {},
  enqueue: () => {},
  getCharacter: () => undefined,
  getCharacters: () => [],
  getCharacterStats: () => ZERO_STATS,
  getActiveCharacters: () => [],
  getBenchCharacters: () => [],
  getLiveCharacters: () => [],
  getTargets: () => [],
  hydrateCharacterIds: () => [],
  updateCharacter: () => {},
  updateQueueItemById: () => {},
  isCharacterPlayerCharacter: () => false,
  substituteCharacters: () => {},
  addDamageToCharacter: () => {},
  addStatusesToCharacter: () => {},
  reduceStatusDurations: () => {},
}

export const CombatSystemContext = createContext(defaultValue)
export const useCombatSystem = () => useContext(CombatSystemContext)

export const CombatSystem = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { party } = usePlayer()
  const { clear } = useLogs()
  const {
    queue,
    enqueue,
    updateById,
    initialize: initializeQueue,
    set: setQueue,
  } = useQueue([])
  const activeCharacterId = useMemo(() => getActiveId(queue), [queue])
  const [partyIds, setPartyIds] = useState<string[]>([])
  const [initialized, setInitialized] = useState(false)
  const [complete, setComplete] = useState(false)
  const {
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
  } = useCombatSystemCharacters()

  const {
    characterStats,
    getCharacterStats,
    setCharacterStats,
    updateCharacterStats,
  } = useCombatSystemStats()

  const activeCharacter = useMemo(
    () => getCharacter(activeCharacterId),
    [activeCharacterId, getCharacter],
  )

  const updateCharacter = (
    id: string | undefined,
    fn: (c: CombatSystemCharacter) => CombatSystemCharacter,
  ) => {
    if (id) {
      setCharacters((list) => list.map((c) => (c.id === id ? fn(c) : c)))
      const foundCharacter = getCharacter(id)
      if (foundCharacter) {
        const character = fn(foundCharacter)
        updateCharacterStats(id, () => getStats(character))
      }
    }
  }

  const getLiveCharacters = (
    characters: CombatSystemCharacter[],
  ): CombatSystemCharacter[] => {
    return characters.filter((character) => {
      const stats = getCharacterStats(character.id)
      return stats.healthRatio > 0
    })
  }

  const isCharacterPlayerCharacter = (id: string) => {
    const character = getCharacter(id)
    if (!character) return false
    return character.partyId === party.id
  }

  const getTargets = (move: Move, source: CombatSystemCharacter) => {
    const targetIds = getTargetIds(move, source, partyIds, getActiveCharacters)
    if (targetIds.length === 0) return []
    return targetIds
      .map((ids) => hydrateCharacterIds(ids))
      .filter((chars) => getLiveCharacters(chars))
      .filter((chars) => chars.length > 0)
  }

  const init = (enemyParty: Party) => {
    setPartyIds([party.id, enemyParty.id])
    const initCharacters = [
      ...party.characters.map((c, i) =>
        convertToCombatSystemCharacter(c, party.id, i < 3),
      ),
      ...enemyParty.characters.map((c, i) =>
        convertToCombatSystemCharacter(c, enemyParty.id, i < 3),
      ),
    ]
    setCharacters(initCharacters)
    initializeQueue(initCharacters.filter((c) => c.isActiveCharacter))
    setCharacterStats(
      initCharacters.map((c) => ({
        id: c.id,
        stats: getStats(c),
      })),
    )
    clear()
    setComplete(false)
    setInitialized(true)
  }

  const substituteCharacters = (activeId: string, benchId: string) => {
    removeActiveCharacter(activeId)
    addActiveCharacter(benchId)
    const stats = getCharacterStats(benchId)
    setQueue((q) => [
      ...q.filter((qi) => qi.id !== activeId),
      ...(stats.healthRatio > 0
        ? [{ id: benchId, value: stats.initiative }]
        : []),
    ])
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
    activeCharacters.forEach((character) => {
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

  const context: CombatSystemContextValue = {
    queue,
    partyIds,
    characters,
    activeCharacter,
    activeCharacters,
    benchCharacters,
    initialized,
    init,
    enqueue: (recovery: number) => enqueue(activeCharacters, recovery),
    getCharacter,
    getCharacters,
    getCharacterStats,
    getActiveCharacters,
    getBenchCharacters,
    getLiveCharacters,
    getTargets,
    hydrateCharacterIds,
    updateCharacter,
    updateQueueItemById: updateById,
    isCharacterPlayerCharacter,
    substituteCharacters,
    addDamageToCharacter,
    addStatusesToCharacter,
    reduceStatusDurations,
  }
  return (
    <CombatSystemContext.Provider value={context}>
      <CombatSystemBuffer>
        <CombatSystemValidation>
          <CombatSystemTurn>{children}</CombatSystemTurn>
        </CombatSystemValidation>
      </CombatSystemBuffer>
    </CombatSystemContext.Provider>
  )
}
