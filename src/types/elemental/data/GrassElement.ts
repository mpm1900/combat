import { v4 } from 'uuid'
import { VineWhip } from '../../move/data/VineWhip'
import { Elemental } from '../elemental'

export const GrassElement: Elemental = {
  id: v4(),
  element: 'grass',
  modifiers: [
    {
      stats: {
        grassDamage: {
          m: 0.25,
          b: 0,
        },
        grassResistance: {
          m: 0.5,
          b: 0,
        },
        fireResistance: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
  moves: [VineWhip],
}
