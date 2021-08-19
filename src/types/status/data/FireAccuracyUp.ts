import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const FireAccuracyUpId = v4()
export const FireAccuracyUp = makeStatusFn({
  statusId: FireAccuracyUpId,
  name: 'Fire Accuracy Up',
  isStackable: true,
  removeOnHit: false,
  removeOnBench: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        fireAccuracy: {
          m: 0.5,
          b: 0,
        },
      },
    },
  ],
  flags: FALSE_FLAGS,
})
