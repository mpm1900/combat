import { v4 } from 'uuid'
import { Elemental } from '../elemental'

export const LightElement: Elemental = {
  id: v4(),
  element: 'light',
  modifiers: [
    {
      stats: {
        lightDamage: {
          m: 0.25,
          b: 0,
        },
        lightResistance: {
          m: 0.5,
          b: 0,
        },
        darkResistance: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
  moves: [],
}
