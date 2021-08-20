import { v4 } from 'uuid'
import { Shocked } from '../../status/data/Shocked'
import { Move } from '../move'

export const Thunderbolt: Move = {
  id: v4(),
  name: 'Thunderbolt',
  type: 'special',
  element: 'thunder',
  target: 'uncontrolled-active-target',
  checks: 3,
  offset: 0,
  power: 90,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [Shocked(0.05, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Shocked(0.5, 5, false)],
  },
}
