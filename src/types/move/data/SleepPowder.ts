import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Dazed } from '../../status/data/Dazed'
import { Move } from '../move'

export const SleepPowder: Move = {
  id: v4(),
  name: 'Sleep Powder',
  type: 'special',
  element: 'grass',
  target: 'uncontrolled-active-target',
  checks: 4,
  offset: 0,
  power: 10,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [Dazed(0.95, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
