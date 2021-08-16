import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const DazedId = v4()
export const Dazed = makeStatusFn({
  statusId: DazedId,
  name: 'Dazed',
  isStackable: false,
  removeOnHit: false,
  removeOnBench: false,
  removeOnActiveTurn: false,
  modifiers: [
    {
      stats: {
        speed: {
          m: -1,
          b: 0,
        },
      },
    },
  ],
})
