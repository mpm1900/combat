import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Confused } from '../../status/data/Confused'
import { Move } from '../move'

export const Psybeam: Move = {
  id: v4(),
  name: 'Psybeam',
  type: 'special',
  element: 'light',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  power: 65,
  recovery: 100,
  energyCost: 5,
  perfectStatuses: {
    target: [Confused(0.1, 10, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
