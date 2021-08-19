import styled from 'styled-components'
import { Column, useSortBy, useTable } from 'react-table'
import { theme } from '../../../theme'

export const StyledTable = styled.table({
  borderCollapse: 'collapse',
})

export const Tr = styled.tr({
  borderBottom: `1px solid ${theme.white2}`,
})

export const Th = styled.th({
  background: 'rgba(0,0,0,0.27)',
  color: theme.white8,
  fontWeight: 400,
  textTransform: 'uppercase',
  fontSize: '12px',
  padding: '4px',
  userSelect: 'none',
})

export const Td = styled.td({
  padding: '4px',
  whiteSpace: 'nowrap',
  fontSize: '14px',
})

export type TableProps<T extends Object> = {
  data: T[]
  columns: Column<T>[]
}

export function Table<T extends Object>(props: TableProps<T>) {
  const { data, columns } = props

  const table = useTable<T>(
    {
      data,
      columns,
    },
    useSortBy,
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
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
    </StyledTable>
  )
}
