import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const ConfusedId = v4()
export const Confused = makeStatusFn({
  statusId: ConfusedId,
  name: 'Confused',
  isStackable: false,
  removeOnBench: false,
  removeOnHit: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {},
    },
  ],
  flags: {
    ...FALSE_FLAGS,
    isConfused: true,
  },
})
