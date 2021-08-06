import { Modifier } from '../stats/stats'

export type Status = {
  id: string
  statusId: string
  name: string
  duration: number
  isPositive: boolean
  isStackable: boolean
  applyChance: number
  modifiers: Modifier[]
}

export type ResolvedStatus = Status & {
  isApplied: boolean
}

export type StatusFn = (
  applyChance: number,
  duration: number,
  isPositive: boolean,
) => Status
