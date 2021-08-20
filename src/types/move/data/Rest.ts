import { v4 } from 'uuid'
import { Resting } from '../../status/data/Resting'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const Rest: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Rest',
  type: 'physical',
  element: 'normal',
  target: 'self',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Resting(1, 3, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
