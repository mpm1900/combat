import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const WaterAttackUpId = v4()
export const WaterAttackUp = makeStatusFn({
  statusId: WaterAttackUpId,
  name: 'Water Attack Up',
  isStackable: true,
  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurn: false,
  modifiers: [
    {
      stats: {
        waterDamage: {
          m: 0.5,
          b: 0,
        },
      },
    },
  ],
})
