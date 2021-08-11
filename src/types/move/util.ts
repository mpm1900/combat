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

export const getRolls = (
  checks: number,
  stat: number,
  forceSucess: number = 0,
  forceFailure: number = 0,
): boolean[] => {
  let results: boolean[] = []
  for (let i = 0; i < checks; i++) {
    const roll = Math.random() * 100
    let result = roll < stat
    if (forceSucess > i) {
      result = true
    } else {
      if (forceFailure > i) {
        result = false
      }
    }
    results = [...results, result]
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
  dodged: boolean
  statuses: MoveResolvedStatuses
  source: Character
  target: Character
  move: Move
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
  const dodged =
    getRolls(1, tStats.evasion)[0] &&
    !perfect &&
    !failure &&
    !(source.id === target.id)
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
    source: statuses.source
      .map((s) => resolveStatus(s))
      .filter(
        (s) => !source.immunities.map((i) => i.statusId).includes(s.statusId),
      ),
    target: statuses.target
      .map((s) => ({
        ...resolveStatus(s),
        isPositive: !s.isPositive,
      }))
      .filter(
        (s) => !target.immunities.map((i) => i.statusId).includes(s.statusId),
      ),
  }

  return {
    totalDamage: dodged ? 0 : totalDamage,
    critical: critical && perfect,
    dodged,
    statuses: resolvedStatuses,
    source,
    target,
    move,
  }
}
