import { config, useSpring } from 'react-spring'
import styled from 'styled-components'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { theme } from '../../theme'
import { Character } from '../../types/character/character'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { CombatBodySection } from './CombatBodySection'

const Spacer = styled(Box)({
  flex: 1,
  height: '0px',
  borderBottom: '1px solid rgba(255,255,255,0.24)',
  margin: 'auto 16px',
})

export type CombatBodyTargetsProps = {
  targetsOptions: Character[][]
}

export const CombatBodyTargets = (props: CombatBodyTargetsProps) => {
  const { targetsOptions } = props
  const { moveBuffer, setMoveBuffer, setTargetsBuffer } = useCombatBuffer()

  const styles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  })

  return (
    <CombatBodySection
      title={
        (
          <Box flex={1}>
            <Box flexDirection='row'>
              <Spacer />
              <Box marginBottom='16px'>
                <span>
                  <span>{moveBuffer?.name}</span> Selected
                </span>
              </Box>
              <Spacer />
            </Box>
            <Box>Select Target(s)</Box>
          </Box>
        ) as any
      }
    >
      <Box flexDirection='row' justifyContent='center' style={styles}>
        {targetsOptions.map((targets, i) => (
          <Box
            key={i}
            padding='16px'
            margin='4px'
            border='1px solid black'
            alignItems='center'
            background={theme.boxGradient}
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
              {targets.reduce((str, target, i) => {
                return (
                  str + target.name + (i !== targets.length - 1 ? ', ' : '')
                )
              }, '')}
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
