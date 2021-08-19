import { Ability } from '../ability/ability'
import { CharacterEvent } from '../characterEvent/characterEvent'
import { ElementalType, Elemental } from '../elemental/elemental'
import { Item } from '../item/item'
import { Move } from '../move/move'
import { Status } from '../status/status'

export type ElementalAccuracyStats = {
  [Property in ElementalType as `${Property}Accuracy`]: number
}
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
  benchRecovery: number
  evasion: number
  criticalChance: number
  criticalDamage: number
  turnHealthRegen: number
  activeTurnHealthRegen: number
  queuePositionOffset: number
  forceCombatCheckSuccess: number
  forceCombatCheckFailure: number
  memory: number
  equip: number
}

export type CharacterStats = BaseCharacterStats &
  AttackStats &
  DefenseStats &
  AccuracyStats &
  ArmorStats &
  ElementalAccuracyStats &
  ElementalDamageStats &
  ElementalResistanceStats

export type CharacterMainStatKeysType =
  | 'health'
  | 'speed'
  | 'physicalAccuracy'
  | 'physicalAttack'
  | 'physicalDefense'
  | 'specialAccuracy'
  | 'specialAttack'
  | 'specialDefense'

export type CharacterModifierDisplayKeyType = keyof (ElementalAccuracyStats &
  ElementalDamageStats &
  ElementalResistanceStats)

export const CharacterModifierDisplayKeys: CharacterModifierDisplayKeyType[] = [
  'normalAccuracy',
  'normalDamage',
  'normalResistance',
  'fireAccuracy',
  'fireDamage',
  'fireResistance',
  'waterAccuracy',
  'waterDamage',
  'waterResistance',
  'grassAccuracy',
  'grassDamage',
  'grassResistance',
  'earthAccuracy',
  'earthDamage',
  'earthResistance',
  'thunderAccuracy',
  'thunderDamage',
  'thunderResistance',
  'airAccuracy',
  'airDamage',
  'airResistance',
  'ghostAccuracy',
  'ghostDamage',
  'ghostResistance',
  'darkAccuracy',
  'darkDamage',
  'darkResistance',
  'lightAccuracy',
  'lightDamage',
  'lightResistance',
]

export const CharacterMainStatKeys: CharacterMainStatKeysType[] = [
  'health',
  'speed',
  'physicalAccuracy',
  'physicalAttack',
  'physicalDefense',
  'specialAccuracy',
  'specialAttack',
  'specialDefense',
]

export type ResolvedCharacterStats = CharacterStats & {
  healthRatio: number
}

export type CharacterFlags = {
  isConfused: boolean
  isImmuneToDamage: boolean
  isImmuneToStatuses: boolean
  isTaunting: boolean
}

export const FALSE_FLAGS: CharacterFlags = {
  isConfused: false,
  isImmuneToDamage: false,
  isImmuneToStatuses: false,
  isTaunting: false,
}

export type Character = {
  id: string
  characterId: string
  partyId?: string
  name: string
  level: number
  damage: number
  energyOffset: number
  stats: CharacterStats
  flags: CharacterFlags
  elements: Elemental[]
  items: Item[]
  abilities: Ability[]
  events: CharacterEvent[]
  statuses: Status[]
  immunities: Status[]
  moves: Move[]
}
