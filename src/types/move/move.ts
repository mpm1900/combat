import { AttackTypes } from '../character/character'
import { ElementalType } from '../elemental/elemental'
import { ResolvedStatus, Status } from '../status/status'

export type MoveStatuses = {
  source: Status[]
  target: Status[]
}

export type MoveResolvedStatuses = {
  source: ResolvedStatus[]
  target: ResolvedStatus[]
}

export type MoveAttributeType = ''
export type MoveAttribute = {}

export type MoveTarget =
  | 'all'
  | 'self'
  | 'controlled-target'
  | 'controlled-target-not-self'
  | 'controlled-party'
  | 'controlled-splash'
  | 'uncontrolled-target'
  | 'uncontrolled-party'
  | 'uncontrolled-splash'

export type Move = {
  id: string
  name: string
  checks: number
  offset: number
  type: AttackTypes
  target: MoveTarget
  element: ElementalType
  energyCost: number
  recovery: number
  power?: number
  attributes?: MoveAttribute[]
  perfectStatuses?: MoveStatuses
  failureStatuses?: MoveStatuses
}
