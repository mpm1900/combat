import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const TauntedId = v4()
export const Taunted = makeStatusFn({
  statusId: TauntedId,
  name: 'Taunted',
  isStackable: false,
  removeOnBench: true,
  removeOnHit: false,
  removeOnActiveTurnStart: true,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {},
    },
  ],
})
