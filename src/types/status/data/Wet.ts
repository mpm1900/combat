import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const WetId = v4()
export const Wet = makeStatusFn({
  statusId: WetId,
  name: 'Wet',
  isStackable: false,

  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        specialDefense: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
  flags: FALSE_FLAGS,
})
