import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const TeleportedId = v4()
export const Teleported = makeStatusFn({
  statusId: TeleportedId,
  name: 'Teleported',
  isStackable: false,
  removeOnHit: false,
  removeOnActiveTurn: false,
  modifiers: [
    {
      stats: {
        queuePositionOffset: {
          m: 0,
          b: -100,
        },
      },
    },
  ],
})
