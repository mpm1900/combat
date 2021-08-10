import { v4 } from 'uuid'
import { Protected, ProtectedId } from '../../status/data/Protected'
import { Move } from '../move'

export const Protect: Move = {
  id: v4(),
  name: 'Protect',
  type: 'special',
  element: 'light',
  target: 'controlled-target',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Protected(1, -1, true, ProtectedId)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
