import { v4 } from 'uuid'
import { Resting } from '../../status/data/Resting'
import { Move } from '../move'

export const Rest: Move = {
  id: v4(),
  name: 'Rest',
  type: 'physical',
  element: 'air',
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