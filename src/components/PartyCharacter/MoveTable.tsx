import { useMemo } from 'react'
import { usePartySystem } from '../../contexts/PartySystemContext'
import { usePlayer } from '../../contexts/PlayerContext'
import { Character } from '../../types/character/character'
import { getStatsAndEquations } from '../../types/character/util'
import { Move } from '../../types/move'
import { Box } from '../_core/Box'
import { Table } from '../_core/Table'
import { getMoveTableColumns } from './getMoveTableColumns'

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
  const columns = useMemo(
    () =>
      getMoveTableColumns(character, stats, mods, {
        addMove,
        removeMove,
      }),
    [character],
  )
  const data = useMemo(() => getMoveList(character.id), [character.id])

  return (
    <Box overflow='auto'>
      <Table data={data} columns={columns} />
    </Box>
  )
}
