import { useState } from 'react'
import { config, useSpring } from 'react-spring'
import styled from 'styled-components'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { theme } from '../../theme'
import { getStats } from '../../types/character/util'
import { Move as MoveType } from '../../types/move'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Move } from '../Move'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { ElementalIcon } from '../_core/ElementalIcon'
import { CombatBodySection } from './CombatBodySection'

const Spacer = styled(Box)({
  flex: 1,
  height: '0px',
  borderBottom: '1px solid rgba(255,255,255,0.24)',
  margin: 'auto 16px',
})

export type CombatBodyActionsProps = {}

export const CombatBodyActions = (props: CombatBodyActionsProps) => {
  const { getActiveCharacter, isCharacterPlayerCharacter } = useCombat()
  const { bufferMove } = useCombatBuffer()
  const character = getActiveCharacter()
  const [activeMove, setActiveMove] = useState<MoveType | undefined>(
    character?.moves[0],
  )
  const stats = character ? getStats(character) : undefined

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
                  <span>{character?.name}'s</span> Turn
                </span>
              </Box>
              <Spacer />
            </Box>
            <Box>Select an Action</Box>
          </Box>
        ) as any
      }
    >
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
                marginLeft='-16px'
                marginBottom='-16px'
                borderRadius='50%'
                height='56px'
                width='56px'
                zIndex={2}
              />
            )}
            <Box flexDirection='row' alignItems='center' paddingLeft='32px'>
              <Button
                isHovering={true}
                marginRight='4px'
                borderRadius='4px 4px 0 0'
                style={{ borderBottom: 'none' }}
              >
                Attacks
              </Button>
              <Button
                borderRadius='4px 4px 0 0'
                style={{ borderBottom: 'none' }}
              >
                Items
              </Button>
            </Box>
          </Box>
          <Box
            alignItems='flex-start'
            background='rgba(0,0,0,0.09)'
            border={`1px solid ${theme.white6}`}
            padding='8px'
            flex='1'
            flexDirection='row'
          >
            <Box
              flex='1'
              padding='8px 4px 8px 8px'
              overflowY='scroll'
              maxHeight='288px'
            >
              {character?.moves?.map((move) => (
                <Box onMouseEnter={() => setActiveMove(move)}>
                  <Button
                    key={move.id}
                    alignItems='center'
                    flexDirection='row'
                    marginTop='8px'
                    padding='8px'
                    width='200px'
                    disabled={
                      !stats ||
                      stats.energy - character.energyOffset < move.energyCost
                    }
                    isHovering={move.id === activeMove?.id}
                    onClick={() => {
                      bufferMove(move)
                    }}
                  >
                    <ElementalIcon height='20px' type={move.element} />
                    <Box>{move.name}</Box>
                  </Button>
                </Box>
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
