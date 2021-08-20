import { v4 } from 'uuid'
import { Move } from '../move'

export const AirSlash: Move = {
  id: v4(),
  name: 'Air Slash',
  type: 'physical',
  element: 'air',
  target: 'uncontrolled-active-target',
  checks: 3,
  offset: -5,
  power: 75,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
