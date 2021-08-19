import { v4 } from 'uuid'
import { DarkElement } from '../../../elemental/data/DarkElement'
import { BookOfFlight } from '../../../item/data/BookOfFlight'
import { Blitz } from '../../../move/data/Blitz'
import { Curse } from '../../../move/data/Curse'
import { DoubleTeam } from '../../../move/data/DoubleTeam'
import { Focus } from '../../../move/data/Focus'
import { Protect } from '../../../move/data/Protect'
import { Rest } from '../../../move/data/Rest'
import { Silence } from '../../../move/data/Silence'
import { TimeWarp } from '../../../move/data/TimeWarp'
import { Character } from '../../character'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const DarkraiId = v4()
export const Darkrai = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  characterId: DarkraiId,
  name: 'Darkrai',
  level: 100,
  elements: [DarkElement],
  items: [BookOfFlight()],
  abilities: [],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...BASE_CHARACTER.stats,
    health: 70,
    speed: 125,
    energy: 100,
    initiative: 100,
    evasion: 5,
    criticalChance: 5,
    criticalDamage: 1.5,
    physicalAccuracy: 70,
    physicalAttack: 90,
    physicalDefense: 90,
    specialAccuracy: 90,
    specialAttack: 125,
    specialDefense: 90,
  },
  moves: [DoubleTeam, Rest, TimeWarp, Blitz, Protect, Focus, Curse, Silence],
})
