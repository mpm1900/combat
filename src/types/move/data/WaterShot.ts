import { v4 } from 'uuid'
import { Wet } from '../../status/data/Wet'
import { Move } from '../move'

export const WaterShot: Move = {
  id: v4(),
  name: 'Water Shot',
  type: 'special',
  element: 'water',
  target: 'uncontrolled-target',
  checks: 3,
  offset: -5,
  power: 150,
  recovery: 100,
  energyCost: 10,
  perfectStatuses: {
    target: [Wet(0.95, 5, true)],
    source: [],
  },
  failureStatuses: {
    target: [],
    source: [Wet(0.95, 5, false)],
  },
}
