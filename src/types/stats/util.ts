import { BASE_MODIFIER } from '../character/data'
import { CharacterStats } from '../character/character'
import {
  addEquations,
  EquationObject,
  makeEquation,
  ZERO_EQUATION,
} from '../equation'
import { Modifier, ResolvedModifier, StatEquations } from './stats'

export function makeModifier(
  key: keyof CharacterStats,
  value: EquationObject = ZERO_EQUATION,
): Modifier {
  return {
    stats: {
      [key]: value,
    },
  } as Modifier
}

export function reduceModifiers(modifiers: Modifier[]) {
  const statKeys = Object.keys(BASE_MODIFIER.stats) as (keyof CharacterStats)[]
  return statKeys.reduce((result, key) => {
    const keyModifier = modifiers.reduce(
      (keyMod, mod) =>
        makeModifier(key, addEquations(keyMod.stats[key], mod.stats[key])),
      makeModifier(key, ZERO_EQUATION),
    )
    return {
      ...result,
      stats: {
        ...result.stats,
        [key]: {
          b: keyModifier.stats[key]?.b || 0,
          m: keyModifier.stats[key]?.m || 0,
        },
      },
    }
  }, {} as ResolvedModifier)
}

export function reduceModifiersToEquations(modifiers: Modifier[]) {
  const stats = reduceModifiers(modifiers).stats
  const keys = Object.keys(stats) as (keyof CharacterStats)[]
  return keys.reduce((result, key) => {
    return {
      ...result,
      stats: {
        ...result.stats,
        [key]: makeEquation({
          b: stats[key]?.b || 0,
          m: stats[key]?.m || 0,
        }),
      },
    }
  }, {} as StatEquations)
}

export function resolveStats(baseStats: CharacterStats, modifiers: Modifier[]) {
  const stats = reduceModifiersToEquations(modifiers).stats
  const keys = Object.keys(stats) as (keyof CharacterStats)[]
  return keys.reduce(
    (result, key) => ({
      ...result,
      [key]: stats[key](result[key]),
    }),
    baseStats,
  )
}
