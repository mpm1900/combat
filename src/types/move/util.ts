import {
  AccuracyStats,
  ArmorStats,
  AttackStats,
  Character,
  CharacterStats,
  DefenseStats,
  ElementalDamageStats,
  ElementalResistanceStats,
} from '../character/character'
import {
  getImmunities,
  getStats,
  getStatsAndEquations,
} from '../character/util'
import { Equation, min } from '../equation'
import { ResolvedStatus, Status } from '../status/status'
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

export const getMovePerfectChance = (
  move: Move,
  character: Character,
  stats: CharacterStats = getStats(character),
) => {
  const stat = stats[`${move.type}Accuracy` as keyof AccuracyStats]
  const statValue = (stat + move.offset) / 100
  return Math.pow(statValue, move.checks)
}

export const getMoveFailureChance = (
  move: Move,
  character: Character,
  stats: CharacterStats = getStats(character),
) => {
  const stat = stats[`${move.type}Accuracy` as keyof AccuracyStats]
  const statValue = (stat + move.offset) / 100
  return Math.pow(1 - statValue, move.checks)
}

export const getResolvedStatuses = (
  statuses: Status[],
  character: Character,
  flip: boolean = false,
): ResolvedStatus[] => {
  return statuses
    .map((s) => ({
      ...resolveStatus(s),
      isPositive: flip ? !s.isPositive : s.isPositive,
    }))
    .filter(
      (s) =>
        !getImmunities(character)
          .map((i) => i.statusId)
          .includes(s.statusId),
    )
}

type Mods = Record<keyof CharacterStats, Equation>

export const getElementalDamageOffset = (
  move: Move,
  rawDamage: number,
  sourceMods: Mods,
  targetMods: Mods,
) => {
  const elementalDamageKey =
    `${move.element}Damage` as keyof ElementalDamageStats
  const elementalResistanceKey =
    `${move.element}Resistance` as keyof ElementalResistanceStats
  const eSourceDamage = sourceMods[elementalDamageKey](rawDamage)
  const eTargetDamage = targetMods[elementalResistanceKey](
    rawDamage + eSourceDamage,
  )
  return eSourceDamage - eTargetDamage
}

export const getArmorDamageOffset = (
  move: Move,
  targetStats: CharacterStats,
) => {
  const armorKey = `${move.type}Armor` as keyof ArmorStats
  const armor = targetStats[armorKey] || 0
  return min(armor - move.armorPenetration, 0)
}

export const getRecoilDamage = (
  move: Move,
  totalDamage: number,
  sourceMods: Mods,
) => {
  const recoilDamage = totalDamage * move.recoilDamage
  return recoilDamage + sourceMods.recoilDamage(recoilDamage)
}

export const getMoveStatuses = (
  move: Move,
  perfect: boolean,
  failure: boolean,
) => {
  return (
    (perfect
      ? move.perfectStatuses
      : failure
      ? move.failureStatuses
      : move.neitherStatuses) || { target: [], source: [] }
  )
}

export type MoveResult = {
  totalDamage: number
  recoilDamage: number
  damageModifier: number
  elementalDamageModifier: number
  armorDamageReduction: number
  successes: number
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
  const isPerfect = successes === move.checks
  const isFailure = successes === 0
  const isDodged =
    getRolls(1, tStats.evasion)[0] &&
    !isPerfect &&
    !isFailure &&
    !(source.id === target.id)
  const baseDamage = (successes / move.checks) * (move.power || 0)
  const damageModifier = getMoveDamageModifier(move, sStats, tStats)
  const [isCritical] = getRolls(1, sStats.criticalChance + move.criticalChance)
  const criticalModifier = isCritical && isPerfect ? sStats.criticalDamage : 1
  const rawDamage = baseDamage * damageModifier * criticalModifier
  const armorDamageReduction = getArmorDamageOffset(move, tStats)
  const elementDamage = getElementalDamageOffset(move, rawDamage, sMods, tMods)
  const resolvedDamage = rawDamage + elementDamage - armorDamageReduction
  const totalDamage =
    rawDamage === 0 || isDodged ? 0 : min(Math.floor(resolvedDamage), 0)
  const recoilDamage = isDodged ? 0 : getRecoilDamage(move, totalDamage, sMods)
  const statuses = getMoveStatuses(move, isPerfect, isFailure)
  const resolvedStatuses: MoveResolvedStatuses = {
    source: getResolvedStatuses(statuses.source, source),
    target: getResolvedStatuses(statuses.target, target, true),
  }

  const elementalDamageModifier =
    rawDamage === 0 ? 0 : (rawDamage + elementDamage) / rawDamage

  return {
    totalDamage,
    recoilDamage,
    damageModifier,
    elementalDamageModifier,
    armorDamageReduction,
    successes,
    critical: isCritical && isPerfect && totalDamage > 0,
    dodged: isDodged && resolvedDamage > 0,
    statuses: resolvedStatuses,
    source,
    target,
    move,
  }
}
