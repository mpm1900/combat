import { v4 } from 'uuid'
import { Gust } from '../../move/data/Gust'
import { Elemental } from '../elemental'

export const AirElement: Elemental = {
  id: v4(),
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
  moves: [Gust],
}
