import { useState } from 'react'
import { PartyCharacterProps } from '.'
import { usePartySystem } from '../../contexts/PartySystemContext'
import { usePlayer } from '../../contexts/PlayerContext'
import { getStats } from '../../types/character/util'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { Move } from '../_core/Move'
import { Select } from '../_core/Select'

export type PartyCharacterDetailsTab = 'edit' | 'view'

export const PartyCharacterDetails = (props: PartyCharacterProps) => {
  const { character } = props
  const { updateCharacter } = usePlayer()
  const { getMoveOptions, getItemOptions } = usePartySystem()
  const [activeTab, setActiveTab] = useState<PartyCharacterDetailsTab>('edit')
  const stats = getStats(character)
  const itemList = Array(stats.equip)
    .fill(undefined)
    .map((_, i) => character.items[i])
  const moveList = Array(stats.memory)
    .fill(undefined)
    .map((_, i) => character.moves[i])
  return (
    <Box overflow='hidden'>
      <Box
        flexDirection='row'
        justifyContent='space-around'
        margin='32px 0 16px 0'
      >
        <Button
          isHovering={activeTab === 'edit'}
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </Button>
        <Button
          isHovering={activeTab === 'view'}
          onClick={() => setActiveTab('view')}
        >
          Details
        </Button>
      </Box>
      <Box
        overflow='auto'
        background='rgba(0,0,0,0.27)'
        padding='16px'
        style={{ boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.27)' }}
      >
        {activeTab === 'edit' && (
          <Box>
            <Box style={{ fontFamily: 'Trade Winds', fontSize: '16px' }}>
              Items
            </Box>
            {itemList.map((item, i) => (
              <Box marginTop='8px'>
                <Select
                  isDisabled={character.items.length >= stats.equip}
                  value={{ value: item?.id, label: item?.name }}
                  options={getItemOptions(character.id).map((m) => ({
                    value: m.id,
                    label: m.name,
                  }))}
                  onChange={(e) => {
                    const itemToAdd = getItemOptions(character.id).find(
                      (m) => m.id === e?.value,
                    )
                    if (itemToAdd) {
                      updateCharacter(character.id, (c) => {
                        const items = [...c.items]
                        items[i] = itemToAdd
                        return {
                          ...c,
                          items,
                        }
                      })
                    }
                  }}
                />
              </Box>
            ))}
            <Box
              marginTop='16px'
              style={{ fontFamily: 'Trade Winds', fontSize: '16px' }}
            >
              Moves
            </Box>
            {moveList.map((move, i) => (
              <Box marginTop='8px'>
                <Select
                  isDisabled={character.moves.length >= stats.memory}
                  value={{ value: move?.id, label: move?.name }}
                  options={getMoveOptions(character.id).map((m) => ({
                    value: m.id,
                    label: m.name,
                  }))}
                  onChange={(e) => {
                    const moveToAdd = getMoveOptions(character.id).find(
                      (m) => m.id === e?.value,
                    )
                    if (moveToAdd) {
                      updateCharacter(character.id, (c) => {
                        const moves = [...c.moves]
                        moves[i] = moveToAdd
                        return {
                          ...c,
                          moves,
                        }
                      })
                    }
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
        {activeTab === 'view' && (
          <Box>
            {moveList.map((move) => (
              <>
                {move ? (
                  <Box marginBottom='8px'>
                    <Move move={move} character={character} />
                  </Box>
                ) : null}
              </>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
