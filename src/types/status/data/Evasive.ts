import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const EvasiveId = v4()
export const Evasive = makeStatusFn({
  statusId: EvasiveId,
  name: 'Evasive',
  isStackable: false,
  modifiers: [
    {
      stats: {
        evasion: {
          m: 0,
          b: 100,
        },
      },
    },
  ],
})
