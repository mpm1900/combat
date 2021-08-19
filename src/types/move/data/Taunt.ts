import { v4 } from 'uuid'
import { Taunted } from '../../status/data/Taunted'
import { Move } from '../move'

export const Taunt: Move = {
  id: v4(),
  name: 'Taunt',
  type: 'physical',
  element: 'light',
  target: 'self',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Taunted(1, -1, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
