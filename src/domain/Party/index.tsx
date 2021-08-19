import { v4 } from 'uuid'
import { useHistory } from 'react-router-dom'
import { PartyCharacter } from '../../components/PartyCharacter'
import { Box } from '../../components/_core/Box'
import { Button, CriticalButton } from '../../components/_core/Button'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { usePartySystem } from '../../contexts/PartySystemContext'
import { usePlayer } from '../../contexts/PlayerContext'
import { Darkrai } from '../../types/character/data/entities/darkrai'
import { Golem } from '../../types/character/data/entities/golem'
import { Pidgeot } from '../../types/character/data/entities/pidgeot'
import { Raichu } from '../../types/character/data/entities/raichu'
import { Party as PartyType } from '../../types/character/party'

const enemies = (): PartyType => ({
  id: v4(),
  characters: [Raichu(), Darkrai(), Golem(), Pidgeot()],
})

export const Party = () => {
  const { push } = useHistory()
  const { party, setParty } = usePlayer()
  const { characters } = party
  const { activeCharacter, setActiveCharacterId, allCharacters } =
    usePartySystem()
  const { init } = useCombatSystem()
  const startCombat = () => {
    init(enemies())
    push('/')
  }
  const addCharacter = () => {
    setParty({
      ...party,
      characters: [...party.characters, { ...allCharacters[0], id: v4() }],
    })
  }
  return (
    <Box flex='1' color='white' height='calc(100vh - 25px)'>
      <Box
        flexDirection='row'
        padding='16px'
        paddingBottom='0'
        justifyContent='space-between'
      >
        <Box flexDirection='row'>
          {characters.map((character) => (
            <Button
              margin='8px 8px 8px 0'
              isHovering={character.id === activeCharacter?.id}
              onClick={() => setActiveCharacterId(character.id)}
            >
              {character.name}
            </Button>
          ))}
          {characters.length < 6 && (
            <Button margin='8px 8px 8px 0' onClick={addCharacter}>
              +
            </Button>
          )}
        </Box>
        <Box>
          <CriticalButton onClick={startCombat}>Start Combat</CriticalButton>
        </Box>
      </Box>
      <Box padding='0 16px 16px 16px' overflow='hidden'>
        <Box overflow='hidden'>
          {activeCharacter && <PartyCharacter character={activeCharacter} />}
        </Box>
      </Box>
    </Box>
  )
}
