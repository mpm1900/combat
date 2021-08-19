import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const SilencedId = v4()
export const Silenced = makeStatusFn({
  statusId: SilencedId,
  name: 'Silenced',
  isStackable: false,
  removeOnBench: true,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        energy: {
          m: 0,
          b: -100,
        },
      },
    },
  ],
  flags: FALSE_FLAGS,
})
