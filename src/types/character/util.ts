import { getResolvedAbilityStatusValue } from '../ability/util'
import { max, min, minmax } from '../equation'
import {
  Modifier,
  reduceModifiers,
  reduceModifiersToEquations,
  resolveStats,
  StatEquations,
} from '../stats'
import { Status } from '../status/status'
import { Character, CharacterStats, ResolvedCharacterStats } from './character'
import { BASE_MODIFIER } from './data'

export const getAbilities = (character: Character) => {
  return character.items.reduce((abilities, item) => {
    return [...abilities, ...item.abilities]
  }, character.abilities)
}

export const getStatuses = (character: Character) => {
  const abilityStatuses = getAbilities(character).reduce(
    (statuses, ability) => {
      const stats = convertStats(character)
      return [
        ...statuses,
        ...ability.statuses.filter((s) =>
          getResolvedAbilityStatusValue(s, stats),
        ),
      ]
    },
    [] as Status[],
  )
  return [...character.statuses, ...abilityStatuses]
}

export const getImmunities = (character: Character) => {
  const abilityImmunities = getAbilities(character).reduce(
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
  const ev = 0 //252

  return Math.floor(((31 + 2 * health + ev / 4) * level) / 100 + 10 + level)
}

const convertStat = (stat: number, level: number) => {
  const ev = 0 //252

  return Math.floor((((31 + 2 * stat + ev / 4) * level) / 100 + 5) * 1)
}

export const convertStats = (character: Character): ResolvedCharacterStats => {
  const baseStats = { ...character.stats }
  const maxHealth = converHealth(baseStats.health, character.level)
  const health = maxHealth - character.damage
  return {
    ...baseStats,
    health: maxHealth,
    speed: convertStat(baseStats.speed, character.level),
    physicalAttack: convertStat(baseStats.physicalAttack, character.level),
    specialAttack: convertStat(baseStats.specialAttack, character.level),
    physicalDefense: convertStat(baseStats.physicalDefense, character.level),
    specialDefense: convertStat(baseStats.specialDefense, character.level),
    healthRatio: health / maxHealth,
  }
}

export const getStats = (character: Character): ResolvedCharacterStats => {
  const modifiers = getModifiers(character)
  const stats = resolveStats(convertStats(character), modifiers)
  const health = stats.health - character.damage
  return {
    ...stats,
    physicalAccuracy: max(stats.physicalAccuracy, 95),
    specialAccuracy: max(stats.specialAccuracy, 95),
    physicalDefense: min(stats.physicalDefense, 1),
    specialDefense: min(stats.specialDefense, 1),
    speed: min(stats.speed, 0),
    energy: min(stats.energy, 0),
    evasion: minmax(stats.evasion, 0, 100),
    healthRatio: health / stats.health,
  }
}

export const getStatsAndModifier = (
  character: Character,
  stats: CharacterStats = getStats(character),
): [CharacterStats, Modifier] => {
  const modifier = reduceModifiers(getModifiers(character))
  return [stats, modifier]
}

export const getStatsAndEquations = (
  character: Character,
  stats: CharacterStats = getStats(character),
): [CharacterStats, StatEquations] => {
  const modifier = reduceModifiersToEquations(getModifiers(character))
  return [stats, modifier]
}
