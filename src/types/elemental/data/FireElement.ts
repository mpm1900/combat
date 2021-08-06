import { Elemental } from '../elemental'

export const FireElement: Elemental = {
  element: 'fire',
  modifiers: [
    {
      stats: {
        fireDamage: {
          m: 0.25,
          b: 0,
        },
        fireResistance: {
          m: 0.5,
          b: 0,
        },
        waterResistance: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
}
