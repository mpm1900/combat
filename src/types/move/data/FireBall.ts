import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Move } from '../move'

export const FireBall: Move = {
  id: v4(),
  name: 'Fire Ball',
  type: 'special',
  element: 'fire',
  target: 'uncontrolled-party',
  checks: 1,
  offset: -10,
  power: 100,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Burned(0.95, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Burned(0.25, 5, false)],
  },
}
