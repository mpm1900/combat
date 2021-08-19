import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Move } from '../move'

export const Ember: Move = {
  id: v4(),
  name: 'Ember',
  type: 'special',
  element: 'fire',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  power: 40,
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
