import { Move, MoveTarget } from '../../../types/move'
import { Box } from '../Box'
import { MoveDetailsTitle, MoveDetailsValue } from './style'

const targetTypeStringMap: Record<MoveTarget, string> = {
  self: 'Self',
  'all-active': 'All',
  'any-active': 'Any',
  'uncontrolled-active-target': 'Enemy',
  'uncontrolled-active-splash': 'Splash',
  'uncontrolled-active-party': 'Party',
  'controlled-active-target': 'Ally or Self',
  'controlled-active-ally': 'Ally',
  'controlled-active-splash': 'Splash',
  'controlled-active-party': 'Team',
}

export type MoveDetailsProps = {
  move: Move
}

export const MoveDetails = (props: MoveDetailsProps) => {
  const { move } = props
  return (
    <Box
      flexDirection='row'
      style={{ textAlign: 'center' }}
      margin='8px 0 12px 0'
    >
      <Box flex={1}>
        <MoveDetailsTitle>Target</MoveDetailsTitle>
        <MoveDetailsValue>{targetTypeStringMap[move.target]}</MoveDetailsValue>
      </Box>
      <Box flex={1}>
        <MoveDetailsTitle>Energy Cost</MoveDetailsTitle>
        <MoveDetailsValue>{move.energyCost}</MoveDetailsValue>
      </Box>
      <Box flex={1}>
        <MoveDetailsTitle>Recovery</MoveDetailsTitle>
        <MoveDetailsValue>{move.recovery}</MoveDetailsValue>
      </Box>
    </Box>
  )
}
