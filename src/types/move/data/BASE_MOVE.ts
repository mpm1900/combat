import { v4 } from 'uuid'
import { Move } from '../move'

export const BASE_MOVE: Move = {
  id: v4(),
  name: '',
  type: 'special',
  element: 'normal',
  target: 'uncontrolled-active-target',
  checks: 1,
  offset: 0,
  power: 0,
  criticalOffset: 0,
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
