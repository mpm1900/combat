import { v4 } from 'uuid'
import { Focused } from '../../status/data/Focused'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const Focus: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Focus',
  type: 'special',
  element: 'light',
  target: 'controlled-active-ally',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Focused(1, -1, true), Focused(1, -1, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
