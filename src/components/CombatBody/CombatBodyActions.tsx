import { useState } from 'react'
import { config, useSpring } from 'react-spring'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { Move as MoveType } from '../../types/move'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Move } from '../Move'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { ElementalIcon } from '../_core/ElementalIcon'
import { CombatBodySection } from './CombatBodySection'

export type CombatBodyActionsProps = {}

export const CombatBodyActions = (props: CombatBodyActionsProps) => {
  const { getActiveCharacter } = useCombat()
  const { bufferMove } = useCombatBuffer()
  const character = getActiveCharacter()
  const [activeMove, setActiveMove] = useState<MoveType | undefined>(
    character?.moves[0],
  )

  const styles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  })

  return (
    <CombatBodySection title='Select an Action'>
      <Box
        flexDirection='row'
        justifyContent='center'
        padding='8px 24px'
        overflow='hidden'
        style={styles}
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
            background='rgba(0,0,0,0.09)'
            border='2px solid rgba(255,255,255,0.81)'
            padding='8px'
            flex='1'
            flexDirection='row'
          >
            <Box flex='1' padding='8px 16px'>
              {character?.moves?.map((move) => (
                <Button
                  key={move.id}
                  alignItems='center'
                  flexDirection='row'
                  marginTop='8px'
                  padding='8px'
                  width='200px'
                  isHovering={move.id === activeMove?.id}
                  onMouseEnter={() => setActiveMove(move)}
                  onClick={() => {
                    bufferMove(move)
                  }}
                >
                  <ElementalIcon height='20px' type={move.element} />
                  <Box>{move.name}</Box>
                </Button>
              ))}
            </Box>
            <Box flex='1' justifyContent='center'>
              {activeMove && (
                <Move move={activeMove} character={character}></Move>
              )}
            </Box>
          </Box>
        </Box>
        <Box flex={1} />
      </Box>
    </CombatBodySection>
  )
}
