import { config, useSpring } from 'react-spring'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { Character } from '../../types/character/character'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { CombatBodySection } from './CombatBodySection'

export type CombatBodyTargetsProps = {
  targetsOptions: Character[][]
}

export const CombatBodyTargets = (props: CombatBodyTargetsProps) => {
  const { targetsOptions } = props
  const { setMoveBuffer, setTargetsBuffer } = useCombatBuffer()

  const styles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  })

  return (
    <CombatBodySection title='Choose a Target'>
      <Box flexDirection='row' style={styles}>
        {targetsOptions.map((targets, i) => (
          <Box
            key={i}
            padding='16px'
            margin='4px'
            border='1px solid black'
            alignItems='center'
            background='linear-gradient(
                    198deg,
                    rgba(45, 47, 56, 1) 0%,
                    rgba(80, 94, 116, 1) 100%
                  )'
          >
            {targets.map((target) => (
              <CombatCharacterAvatar
                key={target.id}
                height='80px'
                width='80px'
                character={target}
              />
            ))}
            <Button marginTop='8px' onClick={() => setTargetsBuffer(targets)}>
              Select
            </Button>
          </Box>
        ))}
      </Box>
      <Box marginTop='32px' flexDirection='row' justifyContent='center'>
        <Button onClick={() => setMoveBuffer(undefined)}>
          Back to Action Select
        </Button>
      </Box>
    </CombatBodySection>
  )
}
