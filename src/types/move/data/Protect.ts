import { v4 } from 'uuid'
import { Protected } from '../../status/data/Protected'
import { Move } from '../move'

export const Protect: Move = {
  id: v4(),
  name: 'Protect',
  type: 'special',
  element: 'light',
  target: 'controlled-active-target',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Protected(1, -1, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
