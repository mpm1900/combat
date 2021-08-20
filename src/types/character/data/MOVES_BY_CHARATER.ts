import { Move } from '../../move'
import { BraveBird } from '../../move/data/BraveBird'
import { DoubleTeam } from '../../move/data/DoubleTeam'
import { FireBall } from '../../move/data/FireBall'
import { FirePunch } from '../../move/data/FirePunch'
import { Flamethrower } from '../../move/data/Flamethrower'
import { FlareBlitz } from '../../move/data/FlareBlitz'
import { Rest } from '../../move/data/Rest'
import { CharizardId } from './entities/charizard'

export const MOVES_BY_CHARACTER: Record<string, Move[]> = {
  [CharizardId]: [
    FireBall,
    FirePunch,
    Flamethrower,
    FlareBlitz,
    Rest,
    DoubleTeam,
    BraveBird,
  ],
}
