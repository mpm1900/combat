import { v4 } from 'uuid'
import { TRUE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const EarthImmunityId = v4()
export const EarthImmunity = makeStatusFn({
  statusId: EarthImmunityId,
  name: 'Earth Immunity',
  isStackable: false,
  removeOnHit: false,
  removeOnBench: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
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
  flags: TRUE_FLAGS,
})
