import { v4 } from 'uuid'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const RazorLeaf: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Razor Leaf',
  type: 'special',
  element: 'grass',
  target: 'uncontrolled-active-party',
  checks: 2,
  offset: -10,
  power: 65,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
