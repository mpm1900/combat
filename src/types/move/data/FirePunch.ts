import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Move } from '../move'

export const FirePunch: Move = {
  id: v4(),
  name: 'Fire Punch',
  type: 'physical',
  element: 'fire',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  power: 60,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Burned(0.25, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Burned(0.25, 5, false)],
  },
}
