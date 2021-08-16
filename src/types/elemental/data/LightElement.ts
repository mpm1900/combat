import { Elemental } from '../elemental'

export const LightElement: Elemental = {
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
}
