import { v4 } from 'uuid'
import { ThunderElement } from '../../../elemental/data/ThunderElement'
import { Thunderbolt } from '../../../move/data/Thunderbolt'
import { ThunderPunch } from '../../../move/data/ThunderPunch'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'

export const Raichu = (): Character => ({
  id: v4(),
  name: 'Raichu',
  level: 100,
  elements: [ThunderElement],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    health: 60 * 5,
    speed: 99,
    energy: 100,
    initiative: 100,
    evasion: 5,
    criticalChance: 5,
    criticalDamage: 1.5,
    physicalAccuracy: 95,
    physicalAttack: 100, //90,
    physicalDefense: 55,
    specialAccuracy: 80,
    specialAttack: 90,
    specialDefense: 80,
  },
  moves: [ThunderPunch, Thunderbolt, ThunderPunch, Thunderbolt],
})
