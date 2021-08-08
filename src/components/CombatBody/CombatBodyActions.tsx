import { useSpring } from 'react-spring'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Move } from '../Move'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'

export type CombatBodyActionsProps = {}

export const CombatBodyActions = (props: CombatBodyActionsProps) => {
  const { getActiveCharacter } = useCombat()
  const { bufferMove } = useCombatBuffer()
  const character = getActiveCharacter()
  return (
    <Box flex='1' overflow='hidden'>
      <Box overflow='hidden'>
        <h2 style={{ color: 'white', textAlign: 'center' }}>
          Select an Action
        </h2>
        <Box
          flexDirection='row'
          justifyContent='center'
          padding='8px 24px'
          overflow='hidden'
        >
          <Box flex={1} />
          <Box maxWidth='640px' overflow='hidden'>
            <Box flexDirection='row' alignItems='flex-end'>
              {character && (
                <CombatCharacterAvatar
                  character={character}
                  position='absolute'
                  marginRight='-8px'
                  marginLeft='-24px'
                  marginBottom='-24px'
                  borderRadius='50%'
                  height='80px'
                  width='80px'
                  zIndex={2}
                />
              )}
              <Box flexDirection='row' alignItems='center' paddingLeft='48px'>
                <Button
                  isHovering={true}
                  disabled={true}
                  marginRight='4px'
                  style={{ borderBottom: 'none' }}
                >
                  Attacks
                </Button>
                <Button style={{ borderBottom: 'none' }}>Items</Button>
              </Box>
            </Box>
            <Box
              flex='1'
              flexDirection='row'
              flexWrap='wrap'
              justifyContent='center'
              overflow='auto'
              background='rgba(0,0,0,0.09)'
              border='2px solid rgba(255,255,255,0.81)'
              padding='8px'
            >
              {character?.moves?.map((move) => (
                <Move key={move.id} move={move} character={character}>
                  <Button
                    marginTop='8px'
                    onClick={() => {
                      bufferMove(move)
                    }}
                  >
                    Select
                  </Button>
                </Move>
              ))}
            </Box>
          </Box>
          <Box flex={1} />
        </Box>
      </Box>
    </Box>
  )
}
