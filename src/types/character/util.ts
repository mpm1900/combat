import { max, min } from '../equation'
import {
  Modifier,
  reduceModifiers,
  reduceModifiersToEquations,
  resolveStats,
  StatEquations,
} from '../stats'
import { Character, CharacterStats } from './character'
import { BASE_MODIFIER } from './data'

export const getModifiers = (character: Character) => {
  const statusModifiers = character.statuses.reduce(
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
