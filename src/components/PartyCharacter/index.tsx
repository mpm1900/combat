import { usePartySystem } from '../../contexts/PartySystemContext'
import { usePlayer } from '../../contexts/PlayerContext'
import { theme } from '../../theme'
import { Character } from '../../types/character/character'
import { getStats } from '../../types/character/util'

import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { Select } from '../_core/Select'
import { PartyCharacterBaseStats } from './PartyCharacterBaseStats'
import { PartyCharacterStats } from './PartyCharacterStats'
import { PartyCharacterTables } from './PartyCharacterTables'
import { MoveTable } from './MoveTable'
import { PartyCharacterStatuses } from './PartyCharacterStatuses'
import { ElementalList } from '../_core/ElementalList'

export type PartyCharacterProps = {
  character: Character
}

export const PartyCharacter = (props: PartyCharacterProps) => {
  const { character } = props
  const { updateCharacter } = usePlayer()
  const { allCharacters, getCharacter, setActiveCharacterId, getMoveOptions } =
    usePartySystem()

  const handleCharacterChange = (option: { value: string; label: string }) => {
    const found = getCharacter(option.value)
    if (found) {
      updateCharacter(character.id, () => found)
      setActiveCharacterId(found.id)
    }
  }
  const stats = getStats(character)
  const itemList = Array(stats.equip)
    .fill(undefined)
    .map((_, i) => character.items[i])
  const moveList = Array(stats.memory)
    .fill(undefined)
    .map((_, i) => character.moves[i])

  return (
    <Box flexDirection='row' overflow='hidden'>
      <Box overflow='hidden'>
        <Box
          padding='16px'
          background={theme.boxGradient}
          border={`1px solid ${theme.white3}`}
          flexDirection='row'
          overflow='auto'
        >
          <Box marginRight='16px'>
            <Select
              value={{ value: character.id, label: character.name }}
              options={allCharacters.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              onChange={(e) => e && handleCharacterChange(e)}
            />
            <Box marginTop='16px'>
              <Box flexDirection='row'>
                <Box>
                  <CombatCharacterAvatar
                    character={character}
                    height='120px'
                    width='120px'
                  />
                  <Box flexDirection='row' justifyContent='center'>
                    <Box
                      background='white'
                      color='black'
                      padding='0 4px'
                      style={{
                        fontFamily: 'Trade Winds',
                      }}
                    >
                      Lv. {character.level}
                    </Box>
                  </Box>
                  <Box flex='1'>
                    <ElementalList
                      elements={character.elements}
                      alignItems='center'
                      flexDirection='row'
                      flex='1'
                      justifyContent='space-around'
                      margin='0 8px 8px 8px'
                    />
                  </Box>
                </Box>
                <PartyCharacterBaseStats character={character} />
              </Box>
              <Box style={{ fontFamily: 'Trade Winds', fontSize: '16px' }}>
                Items
              </Box>
              {itemList.map((item, i) => (
                <Box marginTop='8px'>
                  <Select
                    isDisabled={character.items.length >= stats.equip}
                    value={{ value: item?.id, label: item?.name }}
                    options={[]}
                  />
                </Box>
              ))}
              <Box
                marginTop='8px'
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
          </Box>
          <Box>
            <PartyCharacterStats character={character} />
            <PartyCharacterStatuses character={character} />
          </Box>
        </Box>
      </Box>
      <PartyCharacterTables character={character} />
    </Box>
  )
}
