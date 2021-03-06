import { v4 } from 'uuid'
import { Shocked } from '../../status/data/Shocked'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const ThunderPunch: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Thunder Punch',
  type: 'physical',
  element: 'thunder',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  power: 60,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Shocked(0.25, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Shocked(0.25, 5, false)],
  },
}
