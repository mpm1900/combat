import { v4 } from 'uuid'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const Bubble: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Bubble',
  type: 'special',
  element: 'water',
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
