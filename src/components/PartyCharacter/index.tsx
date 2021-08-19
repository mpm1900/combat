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
import { PartyCharacterStatuses } from './PartyCharacterStatuses'
import { ElementalList } from '../_core/ElementalList'
import { PartyCharacterDetails } from './PartyCharacterDetails'
import { CriticalButton } from '../_core/Button'
import { v4 } from 'uuid'

export type PartyCharacterProps = {
  character: Character
}

export const PartyCharacter = (props: PartyCharacterProps) => {
  const { character } = props
  const { party, updateCharacter, setParty } = usePlayer()
  const {
    allCharacters,
    getCharacter,
    setActiveCharacterId,
    getMoveOptions,
    getItemOptions,
  } = usePartySystem()

  const handleCharacterChange = (option: { value: string; label: string }) => {
    const found = getCharacter(option.value)
    if (found) {
      updateCharacter(character.id, () => ({ ...found, id: v4() }))
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

  const removeCharacter = () => {
    const characters = party.characters.filter((c) => c.id !== character.id)
    setActiveCharacterId(characters[0].id)
    setParty({
      ...party,
      characters,
    })
  }

  return (
    <Box flexDirection='row' overflow='hidden'>
      <Box overflow='hidden'>
        <Box
          padding='16px'
          background={theme.boxGradient}
          border={`1px solid ${theme.white3}`}
          flexDirection='row'
          overflow='hidden'
        >
          <Box marginRight='16px' overflow='hidden'>
            <Select
              value={{ value: character.id, label: character.name }}
              options={allCharacters.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              onChange={(e) => e && handleCharacterChange(e)}
            />
            <Box marginTop='16px' overflow='hidden'>
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
              <PartyCharacterDetails character={character} />
            </Box>
          </Box>
          <Box overflowY='auto'>
            <PartyCharacterStats character={character} />
            <PartyCharacterStatuses character={character} />
            <Box flex='1' />
            <CriticalButton
              disabled={party.characters.length === 1}
              onClick={removeCharacter}
            >
              Remove
            </CriticalButton>
          </Box>
        </Box>
      </Box>
      <PartyCharacterTables character={character} />
    </Box>
  )
}
