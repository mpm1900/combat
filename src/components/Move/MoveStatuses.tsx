import { Character } from '../../types/character/character'
import {
  getMoveFailureChance,
  getMovePerfectChance,
  Move,
} from '../../types/move'
import { Box } from '../_core/Box'
import { MoveStatusesSection } from './MoveStatusesSection'

export type MoveStatusesProps = {
  move: Move
  character?: Character
}

export const MoveStatuses = (props: MoveStatusesProps) => {
  const { move, character } = props
  const hasPerfectStatuses =
    move.perfectStatuses &&
    move.perfectStatuses.source.length + move.perfectStatuses.target.length > 0
  const hasFailureStatuses =
    move.failureStatuses &&
    move.failureStatuses.source.length + move.failureStatuses.target.length > 0
  const perfectChance = character
    ? getMovePerfectChance(move, character)
    : undefined
  const failureChance = character
    ? getMoveFailureChance(move, character)
    : undefined

  if (!hasFailureStatuses && !hasPerfectStatuses) return null
  return (
    <Box background='rgba(0,0,0,0.27)' padding='8px' margin='0 -8px'>
      {hasPerfectStatuses && (
        <MoveStatusesSection
          checks={move.checks}
          chance={perfectChance}
          statuses={move.perfectStatuses}
          title='ON PERFECT'
        />
      )}
      {hasFailureStatuses && (
        <MoveStatusesSection
          checks={move.checks}
          checksColor='rgba(255,255,255,0.36)'
          chance={failureChance}
          statuses={move.failureStatuses}
          title='ON FAILURE'
          marginTop={hasPerfectStatuses ? '6px' : 0}
        />
      )}
    </Box>
  )
}
