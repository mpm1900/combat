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

export type PartyCharacterProps = {
  character: Character
}

export const PartyCharacter = (props: PartyCharacterProps) => {
  const { character } = props
  const { updateCharacter } = usePlayer()
  const { allCharacters, getCharacter, setActiveCharacterId } = usePartySystem()

  const handleCharacterChange = (option: { value: string; label: string }) => {
    const found = getCharacter(option.value)
    if (found) {
      console.log(character, found)
      updateCharacter(character.id, () => found)
      setActiveCharacterId(found.id)
    }
  }
  const stats = getStats(character)
  const itemList = Array(stats.equip).fill(undefined)
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
                <CombatCharacterAvatar
                  character={character}
                  height='120px'
                  width='120px'
                />
                <PartyCharacterBaseStats character={character} />
              </Box>
              <Box
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                items
              </Box>
              {itemList.map((_, i) => (
                <Box marginTop='8px'>
                  <Select />
                </Box>
              ))}
              <Box
                marginTop='16px'
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                moves
              </Box>
              {moveList.map((move, i) => (
                <Box marginTop='8px'>
                  <Select
                    isDisabled={character.moves.length >= stats.memory}
                    value={{ value: move?.id, label: move?.name }}
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
