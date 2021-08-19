import { v4 } from 'uuid'
import { Move } from '../move'

export const Gust: Move = {
  id: v4(),
  name: 'Gust',
  type: 'special',
  element: 'air',
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
