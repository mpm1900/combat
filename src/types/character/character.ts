import { Ability } from '../ability/ability'
import { ElementalType, Elemental } from '../elemental/elemental'
import { Move } from '../move/move'
import { Status } from '../status/status'

export type ElementalDamageStats = {
  [Property in ElementalType as `${Property}Damage`]: number
}
export type ElementalResistanceStats = {
  [Property in ElementalType as `${Property}Resistance`]: number
}
export type AttackTypes = 'physical' | 'special'
export type AttackStats = {
  [Property in AttackTypes as `${Property}Attack`]: number
}
export type DefenseStats = {
  [Property in AttackTypes as `${Property}Defense`]: number
}
export type AccuracyStats = {
  [Property in AttackTypes as `${Property}Accuracy`]: number
}
export type ArmorStats = {
  [Property in AttackTypes as `${Property}Armor`]: number
}
export type BaseCharacterStats = {
  health: number
  speed: number
  energy: number
  initiative: number
  evasion: number
  criticalChance: number
  criticalDamage: number
  turnHealthRegen: number
  activeTurnHealthRegen: number
  queuePositionOffset: number
  forceCombatCheckSuccess: number
  forceCombatCheckFailure: number
}

export type CharacterStats = BaseCharacterStats &
  AttackStats &
  DefenseStats &
  AccuracyStats &
  ArmorStats &
  ElementalDamageStats &
  ElementalResistanceStats

export type ResolvedCharacterStats = CharacterStats & {
  healthRatio: number
}

export type Character = {
  id: string
  partyId?: string
  name: string
  level: number
  damage: number
  energyOffset: number
  stats: CharacterStats
  elements: Elemental[]
  abilities: Ability[]
  statuses: Status[]
  immunities: Status[]
  moves: Move[]
}
