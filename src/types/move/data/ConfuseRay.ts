import { v4 } from 'uuid'
import { Confused } from '../../status/data/Confused'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const ConfuseRay: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Confuse Ray',
  type: 'special',
  element: 'light',
  target: 'uncontrolled-active-target',
  checks: 3,
  offset: -15,
  power: 40,
  recovery: 100,
  energyCost: 5,
  perfectStatuses: {
    target: [Confused(0.95, 10, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
