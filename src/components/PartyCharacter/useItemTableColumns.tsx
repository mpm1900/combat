import { useMemo } from 'react'
import { Column } from 'react-table'
import { Character, CharacterStats } from '../../types/character/character'
import { Item } from '../../types/item/item'
import { AbilityList } from '../_core/AbilityList'
import { MoveList } from '../_core/MoveList'

export const useItemTableColumns = (
  character: Character,
  stats: CharacterStats,
  columnProps: {
    addItem: (item: Item) => void
    removeItem: (id: string) => void
  },
) => {
  const { items } = character
  const itemIds = items.map((i) => i.itemId)
  const columns: Column<Item>[] = useMemo(() => {
    return [
      {
        Header: `(${character.items.length}/${stats.equip})`,
        accessor: 'itemId',
        Cell: (props) => (
          <input
            type='checkbox'
            checked={itemIds.includes(props.value)}
            disabled={
              !itemIds.includes(props.value) && items.length >= stats.equip
            }
            onChange={(e) => {
              const selected = e.target.checked
              if (selected) {
                columnProps.addItem(props.row.original)
              } else {
                columnProps.removeItem(props.row.original.itemId)
              }
            }}
          />
        ),
      },
      {
        Header: 'name',
        accessor: 'name',
      },
      {
        Header: 'abilities',
        accessor: 'abilities',
        Cell: (props) => <AbilityList abilities={props.value} />,
      },
      {
        Header: 'moves',
        accessor: 'moves',
        Cell: (props) => <MoveList moves={props.value} />,
      },
    ]
  }, [character])

  return columns
}
