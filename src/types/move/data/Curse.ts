import { v4 } from 'uuid'
import { Cursed } from '../../status/data/Cursed'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const Curse: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'Curse',
  type: 'special',
  element: 'ghost',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Cursed(1, 6, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
