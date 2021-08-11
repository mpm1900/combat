import { v4 } from 'uuid'
import { WaterElement } from '../../../elemental/data/WaterElement'
import { WaterShot } from '../../../move/data/WaterShot'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const Blastoise = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  name: 'Blastoise',
  level: 100,
  elements: [WaterElement],
  abilities: [],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    health: 79 * 5,
    speed: 78,
    energy: 100,
    initiative: 100,
    evasion: 5,
    criticalChance: 5,
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
