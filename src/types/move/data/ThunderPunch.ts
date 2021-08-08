import { v4 } from 'uuid'
import { Dazed } from '../../status/data/Dazed'
import { Shocked } from '../../status/data/Shocked'
import { Move } from '../move'

export const ThunderPunch: Move = {
  id: v4(),
  name: 'Thunder Punch',
  type: 'physical',
  element: 'thunder',
  target: 'uncontrolled-party',
  checks: 3,
  offset: 0,
  power: 120,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Dazed(0.55, 3, true), Shocked(0.75, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Shocked(0.25, 5, false)],
  },
}
