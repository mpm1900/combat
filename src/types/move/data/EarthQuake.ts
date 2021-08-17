import { v4 } from 'uuid'
import { Move } from '../move'

export const EarthQuake: Move = {
  id: v4(),
  name: 'Earth Quake',
  type: 'physical',
  element: 'earth',
  target: 'uncontrolled-active-party',
  checks: 3,
  offset: 0,
  power: 100,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [],
  },
}
