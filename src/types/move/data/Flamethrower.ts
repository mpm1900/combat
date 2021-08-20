import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const Flamethrower: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Flamethrower',
  type: 'special',
  element: 'fire',
  target: 'uncontrolled-active-target',
  checks: 3,
  offset: 0,
  power: 95,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Burned(0.05, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
