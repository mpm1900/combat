import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const TeleportedId = v4()
export const Teleported = makeStatusFn({
  statusId: TeleportedId,
  name: 'Teleported',
  isStackable: false,
  removeOnBench: true,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        queuePositionOffset: {
          m: -1,
          b: 0,
        },
      },
    },
  ],
  flags: FALSE_FLAGS,
})
