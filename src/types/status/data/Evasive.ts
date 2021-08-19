import { v4 } from 'uuid'
import { TRUE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const EvasiveId = v4()
export const Evasive = makeStatusFn({
  statusId: EvasiveId,
  name: 'Evasive',
  isStackable: false,
  removeOnHit: false,
  removeOnBench: true,
  removeOnActiveTurnStart: false,
  removeOnActiveTurnEnd: false,
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
  flags: TRUE_FLAGS,
})
