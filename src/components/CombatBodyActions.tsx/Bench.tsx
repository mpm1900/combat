import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { usePlayer } from '../../contexts/PlayerContext'
import { theme } from '../../theme'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'

export type CombatBodyActionsBenchProps = {
  commitSubsitution: (id: string) => void
}

export const CombatBodyActionsBench = (props: CombatBodyActionsBenchProps) => {
  const { commitSubsitution } = props
  const { party } = usePlayer()
  const { getBenchCharacters, getLiveCharacters } = useCombatSystem()
  const benchTargets = getLiveCharacters(getBenchCharacters(party.id))

  return (
    <Box flex='1' flexDirection='row' justifyContent='center' minWidth='400px'>
      {benchTargets.map((character) => (
        <Box
          padding='8px'
          margin='8px'
          alignItems='center'
          background={theme.boxGradient}
          border='1px solid rgba(255,255,255,0.45)'
        >
          <CombatCharacterAvatar character={character} />
          <Button
            marginTop='8px'
            onClick={() => commitSubsitution(character.id)}
          >
            {character.name}
          </Button>
        </Box>
      ))}
    </Box>
  )
}
