import { useState } from 'react'
import { config, useSpring } from 'react-spring'
import { theme } from '../../theme'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { Spacer } from '../_core/Spacer'
import { CombatBodySection } from '../CombatBody/CombatBodySection'
import { CombatBodyActionsAttacks } from './Attacks'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemValidation } from '../../contexts/CombatSystemContext/CombatSystemValidation'
import { usePlayer } from '../../contexts/PlayerContext'

export type CombatBodyActionsProps = {}

export const CombatBodyActions = (props: CombatBodyActionsProps) => {
  const { party } = usePlayer()
  const { activeCharacter, getLiveCharacters, getBenchCharacters } =
    useCombatSystem()
  const [tab, setTab] = useState('attacks')

  const styles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  })

  if (!activeCharacter) return null

  return (
    <CombatBodySection
      title={
        (
          <Box flex={1}>
            <Box flexDirection='row'>
              <Spacer />
              <Box marginBottom='16px'>
                <span>
                  <span>{activeCharacter?.name}'s</span> Turn
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
            {activeCharacter && (
              <CombatCharacterAvatar
                character={activeCharacter}
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
                isHovering={tab === 'attacks'}
                marginRight='4px'
                borderRadius='4px 4px 0 0'
                style={{ borderBottom: 'none' }}
                onClick={() => setTab('attacks')}
              >
                Attacks
              </Button>
              <Button
                marginRight='4px'
                borderRadius='4px 4px 0 0'
                style={{ borderBottom: 'none' }}
              >
                Items
              </Button>
              <Button
                isHovering={tab === 'switch'}
                borderRadius='4px 4px 0 0'
                style={{ borderBottom: 'none' }}
                onClick={() => setTab('switch')}
              >
                Switch
              </Button>
            </Box>
          </Box>
          <Box
            background='rgba(0,0,0,0.09)'
            border={`1px solid ${theme.white6}`}
            padding='8px'
            flex='1'
            flexDirection='row'
          >
            {tab === 'attacks' && (
              <CombatBodyActionsAttacks character={activeCharacter} />
            )}
          </Box>
        </Box>
        <Box flex={1} />
      </Box>
    </CombatBodySection>
  )
}
