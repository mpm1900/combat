import { ResolvedCharacterStats } from '../character/character'
import { Status } from '../status/status'

export type AbilityStatusConditionType = 'greater-than' | 'less-than' | 'equal'

export type AbilityStatusCondition = {
  stat: keyof ResolvedCharacterStats
  value: number
  type: AbilityStatusConditionType
}

export type AbilityStatus = Status & {
  conditionsType: 'and' | 'or'
  conditions: AbilityStatusCondition[]
}

export type Ability = {
  id: string
  abilityId: string
  name: string
  statuses: AbilityStatus[]
  immunities: Status[]
}
