import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const FireAttackUpId = v4()
export const FireAttackUp = makeStatusFn({
  statusId: FireAttackUpId,
  name: 'Fire Attack Up',
  isStackable: true,
  removeOnHit: false,
  removeOnBench: false,
  removeOnActiveTurn: false,
  modifiers: [
    {
      stats: {
        fireDamage: {
          m: 0.5,
          b: 0,
        },
      },
    },
  ],
})
