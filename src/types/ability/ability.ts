import { Status } from '../status/status'

export type AbilityStatus = Status & {
  isCritical: boolean
}

export type Ability = {
  id: string
  abilityId: string
  name: string
  statuses: AbilityStatus[]
  immunities: Status[]
}
