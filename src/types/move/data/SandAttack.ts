import { v4 } from 'uuid'
import { Blinded } from '../../status/data/Blinded'
import { Cursed } from '../../status/data/Cursed'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const SandAttack: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Sand Attack',
  type: 'physical',
  element: 'earth',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Blinded(1, 24, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
