import { v4 } from 'uuid'
import { TRUE_FLAGS } from '../../character/character'
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
    canRecieveDamage: false,
    canRecieveStatuses: false,
  },
})
