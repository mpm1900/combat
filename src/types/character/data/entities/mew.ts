import { v4 } from 'uuid'
import { Blaze } from '../../../ability/data/Blaze'
import { Levitate } from '../../../ability/data/Levitate'
import { Overgrow } from '../../../ability/data/Overgrow'
import { FireElement } from '../../../elemental'
import { AirElement } from '../../../elemental/data/AirElement'
import { GrassElement } from '../../../elemental/data/GrassElement'
import { LightElement } from '../../../elemental/data/LightElement'
import { BookOfFlight } from '../../../item/data/BookOfFlight'
import { Blitz } from '../../../move/data/Blitz'
import { ConfuseRay } from '../../../move/data/ConfuseRay'
import { Curse } from '../../../move/data/Curse'
import { DoubleTeam } from '../../../move/data/DoubleTeam'
import { FireBall } from '../../../move/data/FireBall'
import { FlareBlitz } from '../../../move/data/FlareBlitz'
import { Focus } from '../../../move/data/Focus'
import { Protect } from '../../../move/data/Protect'
import { Psybeam } from '../../../move/data/Psybeam'
import { Rest } from '../../../move/data/Rest'
import { Silence } from '../../../move/data/Silence'
import { TimeWarp } from '../../../move/data/TimeWarp'
import { Taunted } from '../../../status/data/Taunted'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const Mew = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  name: 'Mew',
  level: 100,
  elements: [LightElement],
  items: [BookOfFlight()],
  abilities: [],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...BASE_CHARACTER.stats,
    health: 100,
    speed: 100,
    energy: 100,
    initiative: 100,
    evasion: 5,
    criticalChance: 5,
    criticalDamage: 1.5,
    physicalAccuracy: 82,
    physicalAttack: 100,
    physicalDefense: 100,
    specialAccuracy: 82,
    specialAttack: 100,
    specialDefense: 100,
  },
  moves: [ConfuseRay, Psybeam, Protect, Focus],
})
