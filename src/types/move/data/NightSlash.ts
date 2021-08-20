import { v4 } from 'uuid'
import { CriticalChanceUp } from '../../status/data/CriticalChanceUp'
import { Move } from '../move'
import { BASE_MOVE } from './BASE_MOVE'

export const NightSlash: Move = {
  ...BASE_MOVE,
  id: v4(),
  name: 'NightSlash',
  type: 'physical',
  element: 'dark',
  target: 'uncontrolled-active-target',
  checks: 2,
  offset: 0,
  power: 70,
  criticalChance: 0.25,
  recovery: 100,
  energyCost: 0,
  perfectStatuses: {
    target: [],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
