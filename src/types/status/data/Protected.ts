import { v4 } from 'uuid'
import { FALSE_FLAGS } from '../../character/character'
import { makeStatusFn } from '../util'

export const ProtectedId = v4()
export const Protected = makeStatusFn({
  statusId: ProtectedId,
  name: 'Protected',
  isStackable: false,
  removeOnBench: true,
  removeOnHit: true,
  removeOnActiveTurnStart: true,
  removeOnActiveTurnEnd: false,
  modifiers: [
    {
      stats: {},
    },
  ],
  flags: {
    ...FALSE_FLAGS,
    isImmuneToDamage: true,
    isImmuneToStatuses: true,
  },
})
