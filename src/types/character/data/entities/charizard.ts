import { v4 } from 'uuid'
import { FireElement } from '../../../elemental'
import { AirElement } from '../../../elemental/data/AirElement'
import { FireBall } from '../../../move/data/FireBall'
import { FlareBlitz } from '../../../move/data/FlareBlitz'
import { Character } from '../../character'
import { ZERO_STATS } from '../ZERO_STATS'

export const Charizard = (): Character => ({
  id: v4(),
  name: 'Charizard',
  level: 100,
  elements: [FireElement, AirElement],
  statuses: [],
  damage: 0,
  energyOffset: 0,
  stats: {
    ...ZERO_STATS,
    health: 78 * 5,
    speed: 100,
    energy: 100,
    initiative: 100,
    criticalChance: 0.5,
    criticalDamage: 1.5,
    physicalAccuracy: 64,
    physicalAttack: 84,
    physicalDefense: 78,
    specialAccuracy: 85,
    specialAttack: 108,
    specialDefense: 85,
  },
  moves: [FireBall, FlareBlitz],
})
