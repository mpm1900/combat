import { CharacterFlags } from '../character/character'
import { Modifier } from '../stats/stats'

export type Status = {
  id: string
  statusId: string
  name: string
  duration: number
  isPositive: boolean
  isStackable: boolean
  removeOnBench: boolean
  removeOnHit: boolean
  removeOnActiveTurnStart: boolean
  removeOnActiveTurnEnd: boolean
  applyChance: number
  modifiers: Modifier[]
  flags: CharacterFlags
}

export type ResolvedStatus = Status & {
  isApplied: boolean
}

export type StatusStackItem = {
  status: ResolvedStatus
  statuses: ResolvedStatus[]
  count: number
}

export type StatusFn = (
  applyChance: number,
  duration: number,
  isPositive: boolean,
  statusId?: string,
) => Status
