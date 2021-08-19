import { v4 } from 'uuid'
import { TRUE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const WaterAttackUpId = v4()
export const WaterAttackUp = makeStatusFn({
  statusId: WaterAttackUpId,
  name: 'Water Attack Up',
  isStackable: true,
  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
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
  flags: TRUE_FLAGS,
})
