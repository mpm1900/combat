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

  return (
    <Box flexDirection='row'>
      <Box>
        <Box
          padding='16px'
          background={theme.boxGradient}
          border={`1px solid ${theme.white3}`}
          flexDirection='row'
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
            <Box height='16px' />
            <Box>
              <Box flexDirection='row'>
                <CombatCharacterAvatar
                  character={character}
                  height='120px'
                  width='120px'
                />
                <PartyCharacterBaseStats character={character} />
              </Box>
              {itemList.map((_, i) => (
                <Box
                  marginTop='8px'
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  item {i + 1}
                  <Select />
                </Box>
              ))}
            </Box>
          </Box>

          <PartyCharacterStats character={character} />
        </Box>
      </Box>
      <PartyCharacterTables character={character} />
    </Box>
  )
}
