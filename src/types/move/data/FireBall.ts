import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const FireBall: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Fire Ball',
  type: 'special',
  element: 'fire',
  target: 'uncontrolled-active-target',
  checks: 1,
  offset: -10,
  power: 45,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [Burned(0.25, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Burned(0.5, 5, false)],
  },
}
