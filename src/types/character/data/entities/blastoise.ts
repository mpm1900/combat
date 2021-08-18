import { v4 } from 'uuid'
import { Torrent } from '../../../ability/data/Torrent'
import { WaterElement } from '../../../elemental/data/WaterElement'
import { WaterShot } from '../../../move/data/WaterShot'
import { Character } from '../../character'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const BlastoiseId = v4()
export const Blastoise = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  characterId: BlastoiseId,
  name: 'Blastoise',
  level: 100,
  elements: [WaterElement],
  abilities: [Torrent],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...BASE_CHARACTER.stats,
    health: 79,
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
