import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const BlindedId = v4()
export const Blinded = makeStatusFn({
  statusId: BlindedId,
  name: 'Blinded',
  isStackable: true,
  removeOnHit: false,
  removeOnBench: true,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        physicalAccuracy: {
          m: 0,
          b: -10,
        },
      },
    },
  ],
  flags: FALSE_FLAGS,
})
