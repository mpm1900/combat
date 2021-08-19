import { useMemo } from 'react'
import { usePartySystem } from '../../contexts/PartySystemContext'
import { usePlayer } from '../../contexts/PlayerContext'
import { Character } from '../../types/character/character'
import { getStats } from '../../types/character/util'
import { Item } from '../../types/item/item'
import { Box } from '../_core/Box'
import { Table } from '../_core/Table'
import { getItemTableColumns } from './getItemTableColumns'

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
  const columns = useMemo(() => {
    return getItemTableColumns(character, stats, { addItem, removeItem })
  }, [character])
  const data = useMemo(() => getItemList(character.id), [character.id])

  return (
    <Box overflow='auto'>
      <Table columns={columns} data={data} />
    </Box>
  )
}
