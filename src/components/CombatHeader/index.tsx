import { useCombat } from '../../contexts/CombatContext'
import { useCombatTurn } from '../../contexts/CombatContext/turn'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Queue } from '../Queue'
import { QueueNormalized } from '../QueueNormalized'
import { Box } from '../_core/Box'

export type CombatHeaderProps = {}

export const CombatHeader = (props: CombatHeaderProps) => {
  const {} = props
  const { queue, characters, getActiveCharacter } = useCombat()
  const { turnCount } = useCombatTurn()
  const character = getActiveCharacter()
  return (
    <Box background='rgba(0, 0, 0, 0.5)'>
      <Box flexDirection='row' padding='0px 8px 16px 8px'>
        {character && (
          <Box flexDirection='row' width='264px'>
            <Box flex={1} />
            <Box justifyContent='center'>
              <Box
                color='rgba(255,255,255,0.27)'
                textAlign='right'
                padding='4px'
              >
                Turn {turnCount + 1}
              </Box>
              <Box background='white' padding='4px 8px' maxWidth='160px'>
                <span>
                  <strong>{character.name}'s</strong> Turn
                </span>
              </Box>
            </Box>
            <CombatCharacterAvatar
              zIndex={10}
              height='88px'
              width='88px'
              marginTop='-2px'
              character={character}
            />
          </Box>
        )}
        <Box flex='1'>
          <Queue queue={queue} characters={characters} />
          <QueueNormalized queue={queue} characters={characters} />
        </Box>
        <Box width='264px'></Box>
      </Box>
    </Box>
  )
}
