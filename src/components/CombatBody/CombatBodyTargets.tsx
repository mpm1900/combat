import { useEffect } from 'react'
import { config, useSpring } from 'react-spring'
import styled from 'styled-components'
import { useCombatSystemBuffer } from '../../contexts/CombatSystemContext/CombatSystemBuffer'
import { theme } from '../../theme'
import { Character } from '../../types/character/character'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { Spacer } from '../_core/Spacer'
import { CombatBodySection } from './CombatBodySection'

export type CombatBodyTargetsProps = {
  targetsOptions: Character[][]
}

export const CombatBodyTargets = (props: CombatBodyTargetsProps) => {
  const { targetsOptions } = props
  const { moveBuffer, setMoveBuffer, setTargetsBuffer } =
    useCombatSystemBuffer()

  useEffect(() => {
    if (targetsOptions.length === 1) {
      setTargetsBuffer(targetsOptions[0])
    }
  }, [targetsOptions])

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
            border='1px solid rgba(255,255,255,0.27)'
            alignItems='center'
            background={theme.boxGradient}
          >
            {targets.map((target) => (
              <CombatCharacterAvatar
                key={target.id}
                height='80px'
                width='80px'
                character={target}
                onClick={() => setTargetsBuffer(targets)}
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
