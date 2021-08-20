import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const SpecialAttackDownId = v4()
export const SpecialAttackDown = makeStatusFn({
  statusId: SpecialAttackDownId,
  name: 'Special Attack Down',
  isStackable: true,
  removeOnHit: false,
  removeOnBench: true,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        specialAttack: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
  flags: FALSE_FLAGS,
})
