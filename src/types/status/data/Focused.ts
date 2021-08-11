import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const FocusedId = v4()
export const Focused = makeStatusFn({
  statusId: FocusedId,
  name: 'Focused',
  isStackable: true,
  modifiers: [
    {
      stats: {
        forceCombatCheckSuccess: {
          m: 0,
          b: 1,
        },
      },
    },
  ],
})
