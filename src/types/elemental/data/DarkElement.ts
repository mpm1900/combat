import { v4 } from 'uuid'
import { Elemental } from '../elemental'

export const DarkElement: Elemental = {
  id: v4(),
  element: 'dark',
  modifiers: [
    {
      stats: {
        darkDamage: {
          m: 0.25,
          b: 0,
        },
        darkResistance: {
          m: 0.5,
          b: 0,
        },
        ghostResistance: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
  moves: [],
}
