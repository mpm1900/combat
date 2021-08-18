import { useTable, Column } from 'react-table'
import { usePartySystem } from '../../contexts/PartySystemContext'
import { usePlayer } from '../../contexts/PlayerContext'
import { Character } from '../../types/character/character'
import { getStatsAndEquations } from '../../types/character/util'
import { Move } from '../../types/move'
import { Box } from '../_core/Box'
import { Table, Td, Th, Tr } from '../_core/Table'
import { useMoveTableColumns } from './useMoveTableColumns'

export const MoveTable = (props: { character: Character }) => {
  const { character } = props
  const { updateCharacter } = usePlayer()
  const { getMoveList } = usePartySystem()
  const [stats, { stats: mods }] = getStatsAndEquations(character)
  const addMove = (move: Move) => {
    updateCharacter(character.id, (c) => ({
      ...c,
      moves: [...c.moves, move],
    }))
  }
  const removeMove = (id: string) => {
    updateCharacter(character.id, (c) => ({
      ...c,
      moves: c.moves.filter((m) => m.id !== id),
    }))
  }
  const columns: Column<Move>[] = useMoveTableColumns(character, stats, mods, {
    addMove,
    removeMove,
  })
  const table = useTable<Move>({
    data: getMoveList(character.id),
    columns,
  })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table

  return (
    <Box overflow='auto'>
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
