import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const WetId = v4()
export const Wet = makeStatusFn({
  statusId: WetId,
  name: 'Wet',
  isStackable: false,
  removeOnHit: false,
  removeOnActiveTurn: false,
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
})
