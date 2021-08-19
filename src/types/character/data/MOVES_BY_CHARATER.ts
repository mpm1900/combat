import { Move } from '../../move'
import { DoubleTeam } from '../../move/data/DoubleTeam'
import { FireBall } from '../../move/data/FireBall'
import { FlareBlitz } from '../../move/data/FlareBlitz'
import { Rest } from '../../move/data/Rest'
import { CharizardId } from './entities/charizard'

export const MOVES_BY_CHARACTER: Record<string, Move[]> = {
  [CharizardId]: [FireBall, FlareBlitz, Rest, DoubleTeam],
}
