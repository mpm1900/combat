import { v4 } from 'uuid'
import { SpecialAttackDown } from '../../status/data/SpecialAttackDown'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const LeafStorm: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Leaf Storm',
  type: 'special',
  element: 'grass',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: -10,
  power: 140,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [],
    source: [SpecialAttackDown(1, -1, false)],
  },
  failureStatuses: {
    target: [],
    source: [SpecialAttackDown(1, -1, false)],
  },
}
