import { ResolvedCharacterStats } from '../character/character'
import { AbilityStatus, AbilityStatusConditionType } from './ability'

const resolveValue = (
  value: number,
  conditionValue: number,
  type: AbilityStatusConditionType,
): boolean => {
  const greaterThan = (a: number, b: number) => a > b
  const lessThan = (a: number, b: number) => a < b
  const equal = (a: number, b: number) => a === b
  const fn =
    type === 'greater-than'
      ? greaterThan
      : type === 'less-than'
      ? lessThan
      : equal
  return fn(value, conditionValue)
}

export const getResolvedAbilityStatusValue = (
  as: AbilityStatus,
  stats: ResolvedCharacterStats,
): boolean => {
  const and = (a: boolean, b: boolean) => a && b
  const or = (a: boolean, b: boolean) => a || b
  const fn = as.conditionsType === 'and' ? and : or
  const defaultValue = as.conditionsType === 'and' ? true : false
  return as.conditions.reduce((result, current) => {
    const stat = stats[current.stat]
    const { value, type } = current
    return fn(result, resolveValue(stat, value, type))
  }, defaultValue)
}
