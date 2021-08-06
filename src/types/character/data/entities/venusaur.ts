import { v4 } from 'uuid'
import { GrassElement } from '../../../elemental/data/GrassElement'
import { RazorLeaf } from '../../../move/data/RazorLeaf'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'

export const Venusaur = (): Character => ({
  id: v4(),
  name: 'Venusaur',
  level: 100,
  elements: [GrassElement],
  statuses: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    health: 80 * 5,
    speed: 80,
    energy: 100,
    initiative: 100,
    criticalChance: 0.5,
    criticalDamage: 1.5,
    physicalAccuracy: 62,
    physicalAttack: 82,
    physicalDefense: 83,
    specialAccuracy: 80,
    specialAttack: 100,
    specialDefense: 100,
  },
  moves: [RazorLeaf],
})
