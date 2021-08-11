import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const CursedId = v4()
export const Cursed = makeStatusFn({
  statusId: CursedId,
  name: 'Cursed',
  isStackable: true,
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
})
