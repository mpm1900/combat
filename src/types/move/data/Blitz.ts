import { v4 } from 'uuid'
import { Teleported } from '../../status/data/Teleported'
import { Move } from '../move'

export const Blitz: Move = {
  id: v4(),
  name: 'Blitz',
  type: 'special',
  element: 'thunder',
  target: 'controlled-active-target',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Teleported(1, 1, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
