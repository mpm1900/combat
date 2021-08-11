import { v4 } from 'uuid'
import { AirElement } from '../../../elemental/data/AirElement'
import { AirSlash } from '../../../move/data/AirSlash'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'

export const Pidgeot = (): Character => ({
  id: v4(),
  name: 'Pidgeot',
  level: 100,
  elements: [AirElement],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    health: 83 * 5,
    speed: 91,
    energy: 100,
    initiative: 100,
    evasion: 5,
    criticalChance: 5,
    criticalDamage: 1.5,
    physicalAccuracy: 80,
    physicalAttack: 80,
    physicalDefense: 75,
    specialAccuracy: 60,
    specialAttack: 70,
    specialDefense: 70,
  },
  moves: [AirSlash],
})
