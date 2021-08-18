import { v4 } from 'uuid'
import { Levitate } from '../../../ability/data/Levitate'
import { AirElement } from '../../../elemental/data/AirElement'
import { AirSlash } from '../../../move/data/AirSlash'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const Pidgeot = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  name: 'Pidgeot',
  level: 100,
  elements: [AirElement],
  abilities: [Levitate],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...BASE_CHARACTER.stats,
    health: 83,
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
