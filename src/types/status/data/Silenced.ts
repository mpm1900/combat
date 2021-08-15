import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const SilencedId = v4()
export const Silenced = makeStatusFn({
  statusId: SilencedId,
  name: 'Silenced',
  isStackable: false,
  removeOnHit: false,
  removeOnActiveTurn: false,
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
})
