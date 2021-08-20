import { v4 } from 'uuid'
import { Move } from '../move'

export const Surf: Move = {
  id: v4(),
  name: 'Surf',
  type: 'special',
  element: 'water',
  target: 'all-active',
  checks: 3,
  offset: 0,
  power: 100,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
