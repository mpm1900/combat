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
    // TODO: Filter down critical statuses when not in a critical state
    return [...statuses, ...ability.statuses]
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
    speed: min(stats.speed, 0),
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
