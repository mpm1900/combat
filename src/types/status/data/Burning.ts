import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const BurnedId = v4()
export const Burned = makeStatusFn({
  statusId: BurnedId,
  name: 'Burned',
  isStackable: false,
  modifiers: [
    {
      stats: {
        physicalAttack: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
})
