import { v4 } from 'uuid'
import { Sleep } from '../../status/data/Sleep'
import { Move } from '../move'

export const Rest: Move = {
  id: v4(),
  name: 'Rest',
  type: 'physical',
  element: 'air',
  target: 'self',
  checks: 2,
  offset: 0,
  power: 0,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Sleep(1, 3, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
