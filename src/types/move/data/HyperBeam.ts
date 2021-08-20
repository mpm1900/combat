import { v4 } from 'uuid'
import { Dazed } from '../../status/data/Dazed'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const HyperBeam: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Hyper Beam',
  type: 'special',
  element: 'normal',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  power: 150,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [],
    source: [Dazed(1, 4, false)],
  },
  failureStatuses: {
    target: [],
    source: [Dazed(1, 4, false)],
  },
}
