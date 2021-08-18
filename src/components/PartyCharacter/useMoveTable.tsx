import { useMemo } from 'react'
import { useTable, Column } from 'react-table'
import { usePartySystem } from '../../contexts/PartySystemContext'
import {
  Character,
  ElementalAccuracyStats,
} from '../../types/character/character'
import { getStatsAndEquations } from '../../types/character/util'
import { Move } from '../../types/move'
import { getMoveAccuracy } from '../CombatBody/useCombatActions'
import { Box } from '../_core/Box'
import { ElementalIcon } from '../_core/ElementalIcon'
import { MoveStatuses } from '../_core/Move/MoveStatuses'
import { TypeIcon } from '../_core/Move/MoveTypeIcon'
import { Table, Td, Th, Tr } from '../_core/Table'

export const MoveTable = (props: { character: Character }) => {
  const { character } = props
  const { getMoveList } = usePartySystem()
  const { moves } = character
  const [stats, { stats: mods }] = getStatsAndEquations(character)
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
          <input type='checkbox' checked={moveIds.includes(props.value)} />
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
        Header: 'element',
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
        Cell: (props) => (
          <Box padding='0px 4px' style={{ fontSize: '20px', fontWeight: 900 }}>
            {props.value}
          </Box>
        ),
      },
      {
        Header: 'checks',
        accessor: 'checks',
      },
      {
        Header: 'accuracy',
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
  const table = useTable<Move>({
    data: getMoveList(character.id),
    columns,
  })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table

  return (
    <Box overflow='auto' flex={1}>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps()}
                  style={{ whiteSpace: 'nowrap', textAlign: 'left' }}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </Box>
  )
}
