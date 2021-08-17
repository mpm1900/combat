import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const ShockedId = v4()
export const Shocked = makeStatusFn({
  statusId: ShockedId,
  name: 'Shocked',
  isStackable: false,
  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        speed: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
})
