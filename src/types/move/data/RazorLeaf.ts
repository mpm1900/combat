import { v4 } from 'uuid'
import { Move } from '../move'

export const RazorLeaf: Move = {
  id: v4(),
  name: 'Razor Leaf',
  type: 'special',
  element: 'grass',
  target: 'uncontrolled-target',
  checks: 2,
  offset: -10,
  power: 80,
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
