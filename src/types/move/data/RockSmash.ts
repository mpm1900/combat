import { v4 } from 'uuid'
import { Move } from '../move'

export const RockSmash: Move = {
  id: v4(),
  name: 'Rock Smash',
  type: 'physical',
  element: 'earth',
  target: 'uncontrolled-target',
  checks: 3,
  offset: 0,
  power: 120,
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
