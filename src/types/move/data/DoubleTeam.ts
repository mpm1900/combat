import { v4 } from 'uuid'
import { Evasive } from '../../status/data/Evasive'
import { Move } from '../move'

export const DoubleTeam: Move = {
  id: v4(),
  name: 'Double Team',
  type: 'special',
  element: 'normal',
  target: 'self',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Evasive(1, 6, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
