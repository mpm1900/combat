import { useTable } from 'react-table'
import { usePartySystem } from '../../contexts/PartySystemContext'
import { usePlayer } from '../../contexts/PlayerContext'
import { Character } from '../../types/character/character'
import { getStats } from '../../types/character/util'
import { Item } from '../../types/item/item'
import { Box } from '../_core/Box'
import { Table, Td, Th, Tr } from '../_core/Table'
import { useItemTableColumns } from './useItemTableColumns'

export const ItemTable = (props: { character: Character }) => {
  const { character } = props
  const { updateCharacter } = usePlayer()
  const { getItemList } = usePartySystem()
  const stats = getStats(character)

  const addItem = (item: Item) => {
    updateCharacter(character.id, (c) => ({
      ...c,
      items: [...c.items, item],
    }))
  }
  const removeItem = (itemId: string) => {
    updateCharacter(character.id, (c) => ({
      ...c,
      items: c.items.filter((i) => i.itemId !== itemId),
    }))
  }
  const columns = useItemTableColumns(character, stats, { addItem, removeItem })
  const table = useTable<Item>({
    data: getItemList(character.id),
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
