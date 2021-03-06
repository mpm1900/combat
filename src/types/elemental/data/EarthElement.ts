import { v4 } from 'uuid'
import { Elemental } from '../elemental'

export const EarthElement: Elemental = {
  id: v4(),
  element: 'earth',
  modifiers: [
    {
      stats: {
        earthDamage: {
          m: 0.25,
          b: 0,
        },
        earthResistance: {
          m: 0.5,
          b: 0,
        },
        airDamage: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
  moves: [],
}
