import { v4 } from 'uuid'
import { Shocked } from '../../status/data/Shocked'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const Thunderbolt: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Thunderbolt',
  type: 'special',
  element: 'thunder',
  target: 'uncontrolled-active-target',
  checks: 3,
  offset: 0,
  power: 90,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Shocked(0.05, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Shocked(0.5, 5, false)],
  },
}
