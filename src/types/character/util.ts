import { max, min } from '../equation'
import {
  Modifier,
  reduceModifiers,
  reduceModifiersToEquations,
  resolveStats,
  StatEquations,
} from '../stats'
import { Status } from '../status/status'
import { Character, CharacterStats } from './character'
import { BASE_MODIFIER } from './data'

export const getStatuses = (character: Character) => {
  const abilityStatuses = character.abilities.reduce((statuses, ability) => {
    const stats = convertStats(character)
    const health = stats.health - character.damage
    const healthRatio = health / stats.health
    const isCriticalCondition = healthRatio <= 1 / 3
    return [
      ...statuses,
      ...ability.statuses.filter((s) => !s.isCritical || isCriticalCondition),
    ]
  }, [] as Status[])
  return [...character.statuses, ...abilityStatuses]
}

export const getImmunities = (character: Character) => {
  const abilityImmunities = character.abilities.reduce(
    (immunities, ability) => {
      return [...immunities, ...ability.immunities]
    },
    [] as Status[],
  )
  return [...character.immunities, ...abilityImmunities]
}

export const getModifiers = (character: Character) => {
  const statusModifiers = getStatuses(character).reduce(
    (list, status) => [...list, ...status.modifiers],
    [] as Modifier[],
  )
  const elementModifiers = character.elements.reduce(
    (list, element) => [...list, ...element.modifiers],
    [] as Modifier[],
  )
  return [BASE_MODIFIER, ...statusModifiers, ...elementModifiers]
}

const converHealth = (health: number, level: number) => {
  const ev = 252

  return Math.floor(((31 + 2 * health + ev / 4) * level) / 100 + 10 + level)
}

const convertStat = (stat: number, level: number) => {
  const ev = 252

  return Math.floor((((31 + 2 * stat + ev / 4) * level) / 100 + 5) * 1)
}

export const convertStats = (character: Character): CharacterStats => {
  const baseStats = { ...character.stats }
  return {
    ...baseStats,
    health: converHealth(baseStats.health, character.level),
    speed: convertStat(baseStats.speed, character.level),
    physicalAttack: convertStat(baseStats.physicalAttack, character.level),
    specialAttack: convertStat(baseStats.specialAttack, character.level),
    physicalDefense: convertStat(baseStats.physicalDefense, character.level),
    specialDefense: convertStat(baseStats.specialDefense, character.level),
  }
}

export const getStats = (character: Character): CharacterStats => {
  const modifiers = getModifiers(character)
  const stats = resolveStats(convertStats(character), modifiers)
  return {
    ...stats,
    physicalAccuracy: max(stats.physicalAccuracy, 95),
    specialAccuracy: max(stats.specialAccuracy, 95),
    physicalDefense: min(stats.physicalDefense, 1),
    specialDefense: min(stats.specialDefense, 1),
    speed: min(stats.speed, 0),
    energy: min(stats.energy, 0),
    evasion: min(stats.evasion, 0),
  }
}

export const getStatsAndModifier = (
  character: Character,
): [CharacterStats, Modifier] => {
  const stats = getStats(character)
  const modifier = reduceModifiers(getModifiers(character))
  return [stats, modifier]
}

export const getStatsAndEquations = (
  character: Character,
): [CharacterStats, StatEquations] => {
  const stats = getStats(character)
  const modifier = reduceModifiersToEquations(getModifiers(character))
  return [stats, modifier]
}
