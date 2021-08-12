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
    const health = character.stats.health - character.damage
    const isCriticalCondition = health / character.stats.health <= 1 / 3
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

export const getStats = (character: Character): CharacterStats => {
  const modifiers = getModifiers(character)
  const stats = resolveStats(character.stats, modifiers)
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
