import { Move as MoveType, MoveTarget } from '../../../types/move'
import {
  AttackAccuracy,
  AttackAccuracyText,
  AttackPower,
  AttackWrapper,
  Header,
  MoveDetailsValue,
  MoveDetailsTitle,
  Wrapper,
} from './style'
import { TypeIcon } from './MoveTypeIcon'
import { MoveStatuses } from './MoveStatuses'
import {
  AccuracyStats,
  Character,
  ElementalAccuracyStats,
} from '../../../types/character/character'
import { PropsWithChildren, useMemo } from 'react'
import { getStats, getStatsAndEquations } from '../../../types/character/util'
import { Box } from '../Box'
import { ElementalIcon } from '../ElementalIcon'
import { MoveDetails } from './MoveDetails'
import { getMoveAccuracy } from '../../CombatBody/useCombatActions'

export type MoveProps = {
  move: MoveType
  character?: Character
}

export const Move = (props: PropsWithChildren<MoveProps>) => {
  const { move, character, children } = props
  const accuracy = useMemo(() => {
    if (character) {
      const [stats, { stats: mods }] = getStatsAndEquations(character)
      const elementAccuracyBonus =
        mods[`${move.element}Accuracy` as keyof ElementalAccuracyStats]

      return `(${getMoveAccuracy(move, stats, elementAccuracyBonus)}%)`
    }
    return `(${move.offset >= 0 ? '+' : ''}${move.offset})`
  }, [character, move])

  return (
    <Wrapper>
      <Header>
        <ElementalIcon type={move.element} />
        <Box flex={1} paddingRight='16px'>
          <span
            style={{ marginLeft: 8, fontSize: 20, fontFamily: 'Trade Winds' }}
          >
            {move.name}
          </span>
        </Box>
      </Header>
      <AttackWrapper>
        <AttackPower type={move.type}>
          <TypeIcon type={move.type} color='white' />
          {move.power ? (
            <span style={{ marginLeft: 4 }}>{move.power}</span>
          ) : (
            <span style={{ marginLeft: 4 }}>--</span>
          )}
        </AttackPower>
        <AttackAccuracy>
          <AttackAccuracyText checks={move.checks} style={{ marginRight: 4 }}>
            {move.checks}
          </AttackAccuracyText>
          {'@'} {accuracy}
        </AttackAccuracy>
      </AttackWrapper>

      <MoveDetails move={move} />
      <MoveStatuses move={move} character={character} />
      <Box flex={1} />
      {children}
    </Wrapper>
  )
}
