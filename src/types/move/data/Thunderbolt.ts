import { v4 } from 'uuid'
import { Shocked } from '../../status/data/Shocked'
import { Move } from '../move'

export const Thunderbolt: Move = {
  id: v4(),
  name: 'Thunderbolt',
  type: 'special',
  element: 'thunder',
  target: 'uncontrolled-target',
  checks: 1,
  offset: -5,
  power: 45,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [Shocked(0.95, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Shocked(0.95, 5, false)],
  },
}
