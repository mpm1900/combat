import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const WarpedId = v4()
export const Warped = makeStatusFn({
  statusId: WarpedId,
  name: 'Warped',
  isStackable: false,
  removeOnHit: false,
  removeOnActiveTurn: false,
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
