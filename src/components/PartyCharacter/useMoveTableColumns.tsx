import { useMemo } from 'react'
import { Column } from 'react-table'
import {
  Character,
  CharacterStats,
  ElementalAccuracyStats,
} from '../../types/character/character'
import { Equation } from '../../types/equation'
import { Move } from '../../types/move'
import { getMoveAccuracy } from '../CombatBody/useCombatActions'
import { Box } from '../_core/Box'
import { ElementalIcon } from '../_core/ElementalIcon'
import { MoveStatuses } from '../_core/Move/MoveStatuses'
import { TypeIcon } from '../_core/Move/MoveTypeIcon'

export const useMoveTableColumns = (
  character: Character,
  stats: CharacterStats,
  mods: Record<keyof CharacterStats, Equation>,
  columnProps: {
    addMove: (move: Move) => void
    removeMove: (id: string) => void
  },
) => {
  const { moves } = character
  const moveIds = moves.map((m) => m.id)
  const getAccuracy = (move: Move) => {
    const elementAccuracyBonus =
      mods[`${move.element}Accuracy` as keyof ElementalAccuracyStats]
    return getMoveAccuracy(move, stats, elementAccuracyBonus)
  }
  const columns: Column<Move>[] = useMemo(() => {
    return [
      {
        Header: `(${character.moves.length}/${stats.memory})`,
        accessor: 'id',
        Cell: (props) => (
          <input
            type='checkbox'
            checked={moveIds.includes(props.value)}
            disabled={
              !moveIds.includes(props.value) && moves.length >= stats.memory
            }
            onChange={(e) => {
              const selected = e.target.checked
              if (selected) {
                columnProps.addMove(props.row.original)
              } else {
                columnProps.removeMove(props.row.original.id)
              }
            }}
          />
        ),
      },
      {
        Header: 'name',
        accessor: 'name',
        Cell: (props) => (
          <span style={{ whiteSpace: 'nowrap', fontSize: '14px' }}>
            {props.value}
          </span>
        ),
      },
      {
        Header: 'elem',
        accessor: 'element',
        Cell: (props) => (
          <ElementalIcon height='24px' width='24px' type={props.value} />
        ),
      },
      {
        Header: 'type',
        accessor: 'type',
        Cell: (props) => <TypeIcon height='24px' type={props.value} />,
      },

      {
        Header: 'pow',
        accessor: 'power',
        Cell: (props) => <Box style={{ fontWeight: 900 }}>{props.value}</Box>,
      },
      {
        Header: 'checks',
        accessor: 'checks',
      },
      {
        Header: 'acc',
        accessor: (move) => getAccuracy(move),
        Cell: (props: any) => {
          return `${props.value}%`
        },
      },
      {
        Header: 'energy',
        accessor: 'energyCost',
      },
      {
        Header: 'recovery',
        accessor: 'recovery',
      },
      {
        Header: 'perfect',
        accessor: (move) =>
          `${(Math.pow(getAccuracy(move) / 100, move.checks) * 100).toFixed(
            0,
          )}%`,
      },
      {
        Header: 'failure',
        accessor: (move) =>
          `${(Math.pow(1 - getAccuracy(move) / 100, move.checks) * 100).toFixed(
            0,
          )}%`,
      },
      {
        Header: 'perfect statuses',
        accessor: 'perfectStatuses',
        Cell: (props) => (
          <MoveStatuses
            character={character}
            move={props.row.original}
            showFailure={false}
            perfectTitle={''}
            margin='0px'
            background='none'
            padding='0px'
          />
        ),
      },

      {
        Header: 'failure statuses',
        accessor: 'failureStatuses',
        Cell: (props) => (
          <MoveStatuses
            character={character}
            move={props.row.original}
            showPerfect={false}
            failureTitle={''}
            margin='0px'
            background='none'
            padding='0px'
          />
        ),
      },
    ]
  }, [character])

  return columns
}
