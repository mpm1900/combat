import { v4 } from 'uuid'
import { Warped } from '../../status/data/Warped'
import { Move } from '../move'

export const TimeWarp: Move = {
  id: v4(),
  name: 'Time Warp',
  type: 'special',
  element: 'dark',
  target: 'uncontrolled-target',
  checks: 2,
  offset: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Warped(1, 1, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
