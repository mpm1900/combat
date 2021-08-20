import { v4 } from 'uuid'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const BraveBird: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Brave Bird',
  type: 'physical',
  element: 'air',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: -15,
  power: 120,
  recoilDamage: 0.33,
  recovery: 100,
  energyCost: 20,
  perfectStatuses: {
    target: [],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
