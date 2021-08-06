import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { Character } from '../../types/character/character'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'

export type CombatBodyTargetsProps = {
  targetsOptions: Character[][]
}

export const CombatBodyTargets = (props: CombatBodyTargetsProps) => {
  const { targetsOptions } = props
  const { setMoveBuffer, setTargetsBuffer } = useCombatBuffer()
  return (
    <Box flex={1} alignItems='center'>
      <Box flexDirection='row' alignItems='center'>
        <h2 style={{ color: 'white' }}>Choose a Target</h2>
      </Box>
      <Box flexDirection='row'>
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
      <Box marginTop='32px'>
        <Button onClick={() => setMoveBuffer(undefined)}>
          Back to Action Select
        </Button>
      </Box>
    </Box>
  )
}
