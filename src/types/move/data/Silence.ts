import { v4 } from 'uuid'
import { Silenced } from '../../status/data/Silenced'
import { Move } from '../move'

export const Silence: Move = {
  id: v4(),
  name: 'Silence',
  type: 'special',
  element: 'ghost',
  target: 'uncontrolled-target',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Silenced(1, 6, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
