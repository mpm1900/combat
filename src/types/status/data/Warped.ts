import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const WarpedId = v4()
export const Warped = makeStatusFn({
  statusId: WarpedId,
  name: 'Warped',
  isStackable: false,
  removeOnBench: true,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        queuePositionOffset: {
          m: 0,
          b: 100,
        },
      },
    },
  ],
})
