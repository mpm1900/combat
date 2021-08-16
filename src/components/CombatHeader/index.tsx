import { useEffect, useRef } from 'react'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemTurn } from '../../contexts/CombatSystemContext/CombatSystemTurn'
import { useLogs } from '../../contexts/LogsContext'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { CombatLogs } from '../CombatLogs'
import { CombatQueue } from '../CombatQueue'
import { CombatQueueNormalized } from '../CombatQueueNormalized'
import { Box } from '../_core/Box'

export type CombatHeaderProps = {}

export const CombatHeader = (props: CombatHeaderProps) => {
  const {} = props
  const { logs } = useLogs()
  const { queue, activeCharacters, activeCharacter } = useCombatSystem()
  const { turnCount } = useCombatSystemTurn()
  const logContainerRef = useRef(null)
  const scrollToBottom = () => {
    if (logContainerRef.current !== null) {
      const el: any = logContainerRef.current
      if (el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(() => scrollToBottom(), [logs])
  return (
    <Box background='rgba(0, 0, 0, 0.45)' overflow='hidden'>
      <Box flexDirection='row' padding='0px 8px 16px 8px'>
        {activeCharacter && (
          <Box flexDirection='row' width='264px'>
            <Box flex={1} />
            <Box justifyContent='center'>
              <Box
                color='rgba(255,255,255,0.27)'
                textAlign='right'
                padding='4px'
              >
                Turn {turnCount + 1}
              </Box>
              <Box background='white' padding='4px 8px' maxWidth='160px'>
                <span>
                  <strong>{activeCharacter.name}'s</strong> Turn
                </span>
              </Box>
            </Box>
            <CombatCharacterAvatar
              zIndex={10}
              height='88px'
              width='88px'
              marginTop='-2px'
              character={activeCharacter}
            />
          </Box>
        )}
        <Box flex='1'>
          <CombatQueue queue={queue} characters={activeCharacters} />
          <CombatQueueNormalized queue={queue} characters={activeCharacters} />
        </Box>
        <CombatLogs />
      </Box>
    </Box>
  )
}
