import { v4 } from 'uuid'
import { Overgrow } from '../../../ability/data/Overgrow'
import { GrassElement } from '../../../elemental/data/GrassElement'
import { RazorLeaf } from '../../../move/data/RazorLeaf'
import { SleepPowder } from '../../../move/data/SleepPowder'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const Venusaur = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  name: 'Venusaur',
  level: 100,
  elements: [GrassElement],
  abilities: [Overgrow],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...BASE_CHARACTER.stats,
    health: 80,
    speed: 80,
    energy: 100,
    initiative: 100,
    evasion: 5,
    criticalChance: 5,
    criticalDamage: 1.5,
    physicalAccuracy: 62,
    physicalAttack: 82,
    physicalDefense: 83,
    specialAccuracy: 80,
    specialAttack: 100,
    specialDefense: 100,
  },
  moves: [RazorLeaf, SleepPowder],
})
