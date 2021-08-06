import { Move as MoveType, MoveTarget } from '../../types/move'
import {
  AttackAccuracy,
  AttackAccuracyText,
  AttackPower,
  AttackWrapper,
  Header,
  MoveDetails,
  Wrapper,
} from './style'
import { ElementIcon } from './ElementIcon'
import { TypeIcon } from './TypeIcon'
import { MoveStatuses } from './MoveStatuses'
import { AccuracyStats, Character } from '../../types/character/character'
import { PropsWithChildren, useMemo } from 'react'
import { getStats } from '../../types/character/util'
import { Box } from '../_core/Box'

const targetTypeStringMap: Record<MoveTarget, string> = {
  all: 'All',
  self: 'Self',
  'uncontrolled-target': 'Enemy',
  'uncontrolled-splash': 'Splash',
  'uncontrolled-party': 'Party',
  'controlled-target': 'Ally',
  'controlled-splash': 'Splash',
  'controlled-party': 'Team',
}

export type MoveProps = {
  move: MoveType
  character?: Character
}

export const Move = (props: PropsWithChildren<MoveProps>) => {
  const { move, character, children } = props
  const accuracy = useMemo(() => {
    if (character) {
      const stats = getStats(character)
      return `(${
        stats[`${move.type}Accuracy` as keyof AccuracyStats] + move.offset
      }%)`
    }
    return `(${move.offset >= 0 && '+'}${move.offset})`
  }, [character, move])

  return (
    <Wrapper>
      <Header>
        <ElementIcon type={move.element} />
        <Box flex={1} paddingRight='16px'>
          <strong style={{ marginLeft: 8, fontSize: 18 }}>{move.name}</strong>
        </Box>
      </Header>
      <AttackWrapper>
        <AttackPower type={move.type}>
          <TypeIcon type={move.type} />
          <span style={{ marginLeft: 4 }}>{move.power}</span>
        </AttackPower>
        <AttackAccuracy>
          <AttackAccuracyText checks={move.checks} style={{ marginRight: 4 }}>
            {move.checks}
          </AttackAccuracyText>
          {'@'} {accuracy}
        </AttackAccuracy>
      </AttackWrapper>

      <Box
        flexDirection='row'
        style={{ textAlign: 'center' }}
        margin='8px 0 12px 0'
      >
        <MoveDetails>
          <Box style={{ fontSize: 12, whiteSpace: 'nowrap' }}>Target</Box>
          <Box color='white'>{targetTypeStringMap[move.target]}</Box>
        </MoveDetails>
        <MoveDetails>
          <Box style={{ fontSize: 12, whiteSpace: 'nowrap' }}>Energy Cost</Box>
          <Box color='white'>{move.energyCost}</Box>
        </MoveDetails>
        <MoveDetails>
          <Box style={{ fontSize: 12, whiteSpace: 'nowrap' }}>Recovery</Box>
          <Box color='white'>{move.recovery}</Box>
        </MoveDetails>
      </Box>
      <MoveStatuses move={move} character={character} />
      <Box flex={1} />
      {children}
    </Wrapper>
  )
}
