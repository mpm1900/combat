import { v4 } from 'uuid'
import { EarthElement } from '../../../elemental/data/EarthElement'
import { RockSmash } from '../../../move/data/RockSmash'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'

export const Golem = (): Character => ({
  id: v4(),
  name: 'Golem',
  level: 100,
  elements: [EarthElement],
  statuses: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    health: 80 * 5,
    speed: 45,
    energy: 100,
    initiative: 100,
    criticalChance: 0.5,
    criticalDamage: 1.5,
    physicalAccuracy: 85,
    physicalAttack: 110,
    physicalDefense: 130,
    specialAccuracy: 70,
    specialAttack: 55,
    specialDefense: 65,
  },
  moves: [RockSmash],
})
