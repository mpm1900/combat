import { v4 } from 'uuid'
import { Burned } from '../../status/data/Burning'
import { Move } from '../move'

export const FlareBlitz: Move = {
  id: v4(),
  name: 'Flare Blitz',
  type: 'physical',
  element: 'fire',
  target: 'uncontrolled-party',
  checks: 4,
  offset: 0,
  power: 120,
  recovery: 100,
  energyCost: 20,
  perfectStatuses: {
    target: [Burned(0.95, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Burned(1.0, 5, false)],
  },
}
