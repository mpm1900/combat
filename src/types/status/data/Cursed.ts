import { v4 } from 'uuid'
import { TRUE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const CursedId = v4()
export const Cursed = makeStatusFn({
  statusId: CursedId,
  name: 'Cursed',
  isStackable: true,
  removeOnHit: false,
  removeOnBench: false,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {
        forceCombatCheckFailure: {
          m: 0,
          b: 1,
        },
      },
    },
  ],
  flags: TRUE_FLAGS,
})
