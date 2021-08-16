import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const RestingId = v4()
export const Resting = makeStatusFn({
  statusId: RestingId,
  name: 'Resting',
  isStackable: false,
  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurn: false,
  modifiers: [
    {
      stats: {
        speed: {
          m: -1,
          b: 0,
        },
        activeTurnHealthRegen: {
          m: 1,
          b: 0,
        },
      },
    },
  ],
})
