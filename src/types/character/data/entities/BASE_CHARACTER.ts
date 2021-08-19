import { v4 } from 'uuid'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'

export const BASE_CHARACTER_ID = v4()
export const BASE_CHARACTER: Character = {
  id: v4(),
  characterId: BASE_CHARACTER_ID,
  name: '',
  level: 0,
  elements: [],
  items: [],
  abilities: [],
  events: [],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    criticalChance: 5,
    criticalDamage: 1.5,
    memory: 4,
    equip: 1,
    benchRecovery: 50,
  },
  moves: [],
}
