import { v4 } from 'uuid'
import { Blaze } from '../../../ability/data/Blaze'
import { Levitate } from '../../../ability/data/Levitate'
import { FireElement } from '../../../elemental'
import { AirElement } from '../../../elemental/data/AirElement'
import { BookOfFlight } from '../../../item/data/BookOfFlight'
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
import { Confused } from '../../../status/data/Confused'
import { FireAccuracyUp } from '../../../status/data/FireAccuracyUp'
import { FireAttackUp } from '../../../status/data/FireAttackUp'
import { Protected } from '../../../status/data/Protected'
import { Character } from '../../character'
import { BASE_CHARACTER } from './BASE_CHARACTER'

export const CharizardId = v4()
export const Charizard = (): Character => ({
  ...BASE_CHARACTER,
  id: v4(),
  characterId: CharizardId,
  name: 'Charizard',
  level: 100,
  elements: [FireElement, AirElement],
  items: [BookOfFlight()],
  abilities: [Blaze],
  statuses: [],
  immunities: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...BASE_CHARACTER.stats,
    health: 78,
    speed: 102,
    energy: 100,
    initiative: 100,
    evasion: 5,
    criticalChance: 5,
    criticalDamage: 1.5,
    physicalAccuracy: 64,
    physicalAttack: 84,
    physicalDefense: 78,
    specialAccuracy: 85,
    specialAttack: 108,
    specialDefense: 85,
  },
  moves: [FireBall, FlareBlitz, DoubleTeam, Rest],
})
