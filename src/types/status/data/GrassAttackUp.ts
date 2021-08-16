import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const GrassAttackUpId = v4()
export const GrassAttackUp = makeStatusFn({
  statusId: GrassAttackUpId,
  name: 'Grass Attack Up',
  isStackable: true,
  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurn: false,
  modifiers: [
    {
      stats: {
        grassDamage: {
          m: 0.5,
          b: 0,
        },
      },
    },
  ],
})
