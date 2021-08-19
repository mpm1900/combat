import { v4 } from 'uuid'
import { Elemental } from '../elemental'

export const ThunderElement: Elemental = {
  id: v4(),
  element: 'thunder',
  modifiers: [
    {
      stats: {
        thunderDamage: {
          m: 0.25,
          b: 0,
        },
        thunderResistance: {
          m: 0.5,
          b: 0,
        },
        earthResistance: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
  moves: [],
}
