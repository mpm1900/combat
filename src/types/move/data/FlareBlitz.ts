import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const FlareBlitz: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Fire Blast',
  type: 'special',
  element: 'fire',
  target: 'uncontrolled-active-target',
  checks: 4,
  offset: -10,
  power: 120,
  recovery: 100,
  energyCost: 20,
  perfectStatuses: {
    target: [Burned(0.75, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Burned(1.0, 5, false)],
  },
}
