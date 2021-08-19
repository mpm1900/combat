import { v4 } from 'uuid'
import { TRUE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const TauntedId = v4()
export const Taunted = makeStatusFn({
  statusId: TauntedId,
  name: 'Taunted',
  isStackable: false,
  removeOnBench: true,
  removeOnHit: false,
  removeOnActiveTurnStart: true,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {},
    },
  ],
  flags: TRUE_FLAGS,
})
