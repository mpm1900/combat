import { v4 } from 'uuid'
import { ResolvedStatus, Status, StatusFn } from './status'

export const resolveStatus = (status: Status): ResolvedStatus => {
  const { applyChance } = status
  return {
    ...status,
    isApplied: applyChance > Math.random(),
  }
}

type MakeStatusStatus = Omit<
  Status,
  'statusId' | 'id' | 'applyChance' | 'duration' | 'isPositive'
>
export const makeStatusFn = (partial: MakeStatusStatus): StatusFn => {
  const statusId = v4()
  return (applyChance, duration, isPositive) => ({
    ...partial,
    id: v4(),
    statusId,
    applyChance,
    duration,
    isPositive,
  })
}
