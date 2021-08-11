import { v4 } from 'uuid'
import { makeStatusFn } from '../util'

export const ProtectedId = v4()
export const Protected = makeStatusFn({
  statusId: ProtectedId,
  name: 'Protected',
  isStackable: false,
  modifiers: [
    {
      stats: {},
    },
  ],
})
