import { Elemental } from '../elemental'

export const AirElement: Elemental = {
  element: 'air',
  modifiers: [
    {
      stats: {
        airDamage: {
          m: 0.25,
          b: 0,
        },
        airResistance: {
          m: 0.5,
          b: 0,
        },
        thunderResistance: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
}
