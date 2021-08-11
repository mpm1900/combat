import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const RestingId = v4()
export const Resting = makeStatusFn({
  statusId: RestingId,
  name: 'Resting',
  isStackable: false,
  modifiers: [
    {
      stats: {
        speed: {
          m: -1,
          b: 0,
        },
        activeTurnHealthRegen: {
          m: 0,
          b: 9999,
        },
      },
    },
  ],
})
