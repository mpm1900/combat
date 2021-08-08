import { v4 } from 'uuid'
import { Move } from '../move'

export const AirSlash: Move = {
  id: v4(),
  name: 'Air Slash',
  type: 'physical',
  element: 'air',
  target: 'uncontrolled-target',
  checks: 2,
  offset: 0,
  power: 80,
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
