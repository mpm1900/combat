import { v4 } from 'uuid'
import { WaterElement } from '../../../elemental/data/WaterElement'
import { WaterShot } from '../../../move/data/WaterShot'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'

export const Blastoise = (): Character => ({
  id: v4(),
  name: 'Blastoise',
  level: 100,
  elements: [WaterElement],
  statuses: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    health: 79 * 5,
    speed: 78,
    energy: 100,
    initiative: 100,
    criticalChance: 0.5,
    criticalDamage: 1.5,
    physicalAccuracy: 70,
    physicalAttack: 83,
    physicalDefense: 100,
    specialAccuracy: 75,
    specialAttack: 85,
    specialDefense: 105,
  },
  moves: [WaterShot],
})
