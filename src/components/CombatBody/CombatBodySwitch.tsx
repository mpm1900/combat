import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemValidation } from '../../contexts/CombatSystemContext/CombatSystemValidation'
import { usePlayer } from '../../contexts/PlayerContext'
import { theme } from '../../theme'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { CombatBodySection } from './CombatBodySection'

export const CombatBodySwitch = () => {
  const { party } = usePlayer()
  const { getLiveCharacters, getBenchCharacters } = useCombatSystem()
  const { activateCharacter, benchCharactersToAdd } =
    useCombatSystemValidation()
  const liveBench = getLiveCharacters(getBenchCharacters(party.id))

  return (
    <CombatBodySection title='Select Characters to Sub-in'>
      <Box flexDirection='row' justifyContent='center'>
        {liveBench.map((character) => (
          <Box
            padding='8px'
            border='1px solid rgba(255,255,255,0.45)'
            background={theme.boxGradient}
            alignItems='center'
          >
            <CombatCharacterAvatar
              character={character}
              onClick={() => activateCharacter(character.id)}
            />
            <Button
              marginTop='8px'
              onClick={() => activateCharacter(character.id)}
            >
              {character.name}
            </Button>
          </Box>
        ))}
      </Box>
    </CombatBodySection>
  )
}
