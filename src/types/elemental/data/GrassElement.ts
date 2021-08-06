import { Elemental } from '../elemental'

export const GrassElement: Elemental = {
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
}
