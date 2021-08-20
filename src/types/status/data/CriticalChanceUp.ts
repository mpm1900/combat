import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const CriticalChanceUpId = v4()
export const CriticalChanceUp = makeStatusFn({
  statusId: CriticalChanceUpId,
  name: 'Critical Chance Up',
  isStackable: true,
  removeOnHit: false,
  removeOnBench: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        fireAccuracy: {
          m: 0,
          b: 10,
        },
      },
    },
  ],
  flags: FALSE_FLAGS,
})
