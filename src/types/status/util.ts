import { v4 } from 'uuid'
import { ResolvedStatus, Status, StatusFn, StatusStackItem } from './status'

export const resolveStatus = (status: Status): ResolvedStatus => {
  const { applyChance } = status
  const value = applyChance > Math.random()
  return {
    ...status,
    isApplied: value,
  }
}

type MakeStatusStatus = Omit<
  Status,
  'id' | 'applyChance' | 'duration' | 'isPositive'
>
export const makeStatusFn = (partial: MakeStatusStatus): StatusFn => {
  return (applyChance, duration, isPositive) => ({
    ...partial,
    id: v4(),
    applyChance,
    duration,
    isPositive,
  })
}

export const convertStatusesToStack = (
  statuses: Status[],
): StatusStackItem[] => {
  let list = [...statuses]
  let stack: StatusStackItem[] = []
  list.forEach((status) => {
    const itemStatuses = list
      .filter((s) => s.statusId === status.statusId)
      .map((is) => {
        const s = { ...is } as ResolvedStatus
        return { ...s, isApplied: s.isApplied ?? true }
      })
    list = list.filter((s) => s.statusId !== status.statusId)
    stack = [
      ...stack,
      {
        status: itemStatuses[0],
        statuses: itemStatuses,
        count: itemStatuses.length,
      },
    ]
  })
  return stack.filter((si) => si.count > 0)
}
