import { Elemental } from '../elemental'

export const WaterElement: Elemental = {
  element: 'water',
  modifiers: [
    {
      stats: {
        waterDamage: {
          m: 0.25,
          b: 0,
        },
        waterResistance: {
          m: 0.5,
          b: 0,
        },
        grassResistance: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
}
