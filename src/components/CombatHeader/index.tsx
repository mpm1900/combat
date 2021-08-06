import { useCombat } from '../../contexts/CombatContext'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Queue } from '../Queue'
import { QueueNormalized } from '../QueueNormalized'
import { Box } from '../_core/Box'

export type CombatHeaderProps = {}

export const CombatHeader = (props: CombatHeaderProps) => {
  const {} = props
  const { queue, characters, getActiveCharacter } = useCombat()
  const character = getActiveCharacter()
  return (
    <Box flexDirection='row' padding='0px 8px 24px 8px'>
      {character && (
        <CombatCharacterAvatar
          zIndex={10}
          height='88px'
          width='88px'
          character={character}
        />
      )}
      <Box flex='1'>
        <Queue queue={queue} characters={characters} />
        <QueueNormalized queue={queue} characters={characters} />
      </Box>
    </Box>
  )
}
