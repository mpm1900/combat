import { v4 } from 'uuid'
import { Sturdy } from '../../../ability/data/Sturdy'
import { EarthElement } from '../../../elemental/data/EarthElement'
import { Earthquake } from '../../../move/data/Earthquake'
import { SandAttack } from '../../../move/data/SandAttack'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const Golem = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  name: 'Golem',
  level: 100,
  elements: [EarthElement],
  abilities: [Sturdy],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...BASE_CHARACTER.stats,
    health: 80,
    speed: 45,
    energy: 100,
    initiative: 100,
    evasion: 5,
    criticalChance: 5,
    criticalDamage: 1.5,
    physicalAccuracy: 85,
    physicalAttack: 110,
    physicalDefense: 130,
    specialAccuracy: 70,
    specialAttack: 55,
    specialDefense: 65,
  },
  moves: [Earthquake, SandAttack],
})
