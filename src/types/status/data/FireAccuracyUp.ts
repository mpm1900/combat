import { v4 } from 'uuid'
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
})
