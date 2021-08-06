import {
  AccuracyStats,
  AttackStats,
  Character,
  CharacterStats,
  DefenseStats,
  ElementalDamageStats,
  ElementalResistanceStats,
} from '../character/character'
import { getStats, getStatsAndEquations } from '../character/util'
import { resolveStatus } from '../status/util'
import { Move, MoveResolvedStatuses, MoveStatuses } from './move'

export const getRolls = (checks: number, stat: number): boolean[] => {
  let results: boolean[] = []
  for (let i = 0; i < checks; i++) {
    const roll = Math.random() * 100
    results = [...results, roll < stat]
  }
  return results
}

export const getMoveDamageModifier = (
  move: Move,
  sourceStats: CharacterStats,
  targetStats: CharacterStats,
): number => {
  return (
    sourceStats[`${move.type}Attack` as keyof AttackStats] /
    targetStats[`${move.type}Defense` as keyof DefenseStats]
  )
}

export const getMovePerfectChance = (move: Move, character: Character) => {
  const stats = getStats(character)
  const stat = stats[`${move.type}Accuracy` as keyof AccuracyStats]
  const statValue = (stat + move.offset) / 100
  return Math.pow(statValue, move.checks)
}

export const getMoveFailureChance = (move: Move, character: Character) => {
  const stats = getStats(character)
  const stat = stats[`${move.type}Accuracy` as keyof AccuracyStats]
  const statValue = (stat + move.offset) / 100
  return Math.pow(1 - statValue, move.checks)
}

export type MoveResult = {
  totalDamage: number
  critical: boolean
  statuses: MoveResolvedStatuses
  source: Character
  target: Character
}

export const resolveMove = (
  source: Character,
  target: Character,
  move: Move,
  rolls: boolean[],
): MoveResult => {
  const [sStats, { stats: sMods }] = getStatsAndEquations(source)
  const [tStats, { stats: tMods }] = getStatsAndEquations(target)
  const successes = rolls.filter(Boolean).length
  const perfect = successes === move.checks
  const failure = successes === 0
  const baseDamage = (successes / move.checks) * (move.power || 0)
  const damageModifier = getMoveDamageModifier(move, sStats, tStats)
  const [critical] = getRolls(1, sStats.criticalChance)
  const criticalMod = critical && perfect ? sStats.criticalDamage : 1
  const rawDamage = baseDamage * damageModifier * criticalMod
  const elementalDamageKey =
    `${move.element}Damage` as keyof ElementalDamageStats
  const elementalResistanceKey =
    `${move.element}Resistance` as keyof ElementalResistanceStats
  const eSourceDamage = sMods[elementalDamageKey](rawDamage)
  const eTargetDamage = tMods[elementalResistanceKey](rawDamage + eSourceDamage)
  const totalDamage =
    rawDamage === 0 ? 0 : Math.floor(rawDamage + eSourceDamage - eTargetDamage)
  const statuses: MoveStatuses = (perfect
    ? move.perfectStatuses
    : failure
    ? move.failureStatuses
    : undefined) || { target: [], source: [] }

  const resolvedStatuses: MoveResolvedStatuses = {
    source: statuses.source.map((s) => resolveStatus(s)),
    target: statuses.target.map((s) => resolveStatus(s)),
  }

  return {
    totalDamage,
    critical: critical && perfect,
    statuses: resolvedStatuses,
    source,
    target,
  }
}
