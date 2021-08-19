import { v4 } from 'uuid'
import { TRUE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const BurnedId = v4()
export const Burned = makeStatusFn({
  statusId: BurnedId,
  name: 'Burned',
  isStackable: false,
  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
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
  flags: TRUE_FLAGS,
})
