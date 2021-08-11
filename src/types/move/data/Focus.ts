import { v4 } from 'uuid'
import { Focused } from '../../status/data/Focused'
import { Move } from '../move'

export const Focus: Move = {
  id: v4(),
  name: 'Focus',
  type: 'special',
  element: 'light',
  target: 'controlled-target',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Focused(1, 6, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
