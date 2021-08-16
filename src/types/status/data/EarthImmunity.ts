import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const EarthImmunityId = v4()
export const EarthImmunity = makeStatusFn({
  statusId: EarthImmunityId,
  name: 'Earth Immunity',
  isStackable: false,
  removeOnHit: false,
  removeOnBench: false,
  removeOnActiveTurn: false,
  modifiers: [
    {
      stats: {
        earthResistance: {
          m: 2,
          b: 0,
        },
      },
    },
  ],
})
