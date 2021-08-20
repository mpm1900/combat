import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { CriticalChanceUp } from '../../status/data/CriticalChanceUp'
import { Move } from '../move'

export const NightSlash: Move = {
  id: v4(),
  name: 'NightSlash',
  type: 'physical',
  element: 'dark',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  power: 70,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [],
    source: [CriticalChanceUp(1, 12, true)],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
