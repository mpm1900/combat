import { v4 } from 'uuid'
import { TRUE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const RestingId = v4()
export const Resting = makeStatusFn({
  statusId: RestingId,
  name: 'Resting',
  isStackable: false,
  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        speed: {
          m: -1,
          b: 0,
        },
        activeTurnHealthRegen: {
          m: 1,
          b: 0,
        },
      },
    },
  ],
  flags: TRUE_FLAGS,
})
