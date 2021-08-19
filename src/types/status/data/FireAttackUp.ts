import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const FireAttackUpId = v4()
export const FireAttackUp = makeStatusFn({
  statusId: FireAttackUpId,
  name: 'Fire Attack Up',
  isStackable: true,
  removeOnHit: false,
  removeOnBench: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
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
  flags: FALSE_FLAGS,
})
