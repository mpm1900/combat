import { v4 } from 'uuid'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'

export const BASE_CHARACTER: Character = {
  id: v4(),
  name: '',
  level: 0,
  elements: [],
  abilities: [],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: { ...ZERO_STATS },
  moves: [],
}
