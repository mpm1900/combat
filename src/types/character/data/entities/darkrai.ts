import { v4 } from 'uuid'
import { Blaze } from '../../../ability/data/Blaze'
import { Levitate } from '../../../ability/data/Levitate'
import { Overgrow } from '../../../ability/data/Overgrow'
import { FireElement } from '../../../elemental'
import { AirElement } from '../../../elemental/data/AirElement'
import { DarkElement } from '../../../elemental/data/DarkElement'
import { GrassElement } from '../../../elemental/data/GrassElement'
import { LightElement } from '../../../elemental/data/LightElement'
import { Blitz } from '../../../move/data/Blitz'
import { Curse } from '../../../move/data/Curse'
import { DoubleTeam } from '../../../move/data/DoubleTeam'
import { FireBall } from '../../../move/data/FireBall'
import { FlareBlitz } from '../../../move/data/FlareBlitz'
import { Focus } from '../../../move/data/Focus'
import { Protect } from '../../../move/data/Protect'
import { Rest } from '../../../move/data/Rest'
import { Silence } from '../../../move/data/Silence'
import { TimeWarp } from '../../../move/data/TimeWarp'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const Darkrai = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  name: 'Darkrai',
  level: 100,
  elements: [DarkElement],
  abilities: [Levitate],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    health: 70,
    speed: 125,
    energy: 100,
    initiative: 100,
    evasion: 100,
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
