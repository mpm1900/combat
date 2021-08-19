import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import {
  Character,
  CharacterStats,
  ElementalAccuracyStats,
} from '../../types/character/character'
import { Equation } from '../../types/equation'
import { Move } from '../../types/move'
import { getMoveAccuracy } from '../CombatBody/useCombatActions'
import { Box, NumberBox } from '../_core/Box'
import { ElementalIcon } from '../_core/ElementalIcon'
import { MoveStatuses } from '../_core/Move/MoveStatuses'
import { TypeIcon } from '../_core/Move/MoveTypeIcon'
import { MoveList } from '../_core/MoveList'

export const getMoveTableColumns = (
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
  const columns: Column<Move>[] = [
    {
      Header: `(${character.moves.length}/${stats.memory})`,
      accessor: (move) => moveIds.includes(move.id),
      Cell: (props: CellProps<Move>) => (
        <input
          type='checkbox'
          checked={moveIds.includes(props.row.original.id)}
          disabled={
            !moveIds.includes(props.row.original.id) &&
            moves.length >= stats.memory
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
      Cell: (props) => <MoveList moves={[props.row.original]} />,
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
      Header: 'power',
      accessor: 'power',
      Cell: (props) => <Box style={{ fontWeight: 900 }}>{props.value}</Box>,
    },
    {
      Header: 'accuracy',
      accessor: (move) => getAccuracy(move),
      Cell: (props: any) => <NumberBox>{props.value}%</NumberBox>,
    },
    {
      Header: 'checks',
      accessor: 'checks',
      Cell: (props) => <NumberBox>{props.value}</NumberBox>,
    },
    {
      Header: 'energy',
      accessor: 'energyCost',
      Cell: (props) => <NumberBox>{props.value}</NumberBox>,
    },
    {
      Header: 'recovery',
      accessor: 'recovery',
      Cell: (props) => <NumberBox>{props.value}</NumberBox>,
    },
    {
      Header: 'perfect',
      accessor: (move) =>
        `${(Math.pow(getAccuracy(move) / 100, move.checks) * 100).toFixed(0)}%`,
      Cell: (props: any) => <NumberBox>{props.value}</NumberBox>,
    },
    {
      Header: 'failure',
      accessor: (move) =>
        `${(Math.pow(1 - getAccuracy(move) / 100, move.checks) * 100).toFixed(
          0,
        )}%`,
      Cell: (props: any) => <NumberBox>{props.value}</NumberBox>,
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

  return columns
}
