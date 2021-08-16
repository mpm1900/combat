import { useEffect, useRef } from 'react'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { CombatSystemCharacter } from '../../contexts/CombatSystemContext/types'
import { useLogs } from '../../contexts/LogsContext'
import { Box, BoxProps } from '../_core/Box'

export const CombatLogs = () => {
  const { logs } = useLogs()

  const logContainerRef = useRef(null)
  const scrollToBottom = () => {
    if (logContainerRef.current !== null) {
      const el: any = logContainerRef.current
      if (el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(scrollToBottom, [logs])

  return (
    <Box
      width='264px'
      height='75px'
      overflow='auto'
      color='rgba(255,255,255,0.72)'
      padding='8px'
      style={{
        fontSize: '14px',
      }}
    >
      {logs.map((log) => (
        <Box flexDirection='row' width='100%'>
          {log}
        </Box>
      ))}
      <Box ref={logContainerRef} />
    </Box>
  )
}

export type LogCharacterProps = BoxProps & {
  characterId: string
}
export const LogCharacter = (props: LogCharacterProps) => {
  const { characterId, children, ...rest } = props
  const { isCharacterPlayerCharacter } = useCombatSystem()
  return (
    <Box
      color={
        isCharacterPlayerCharacter(characterId) ? 'lightblue' : 'lightsalmon'
      }
      marginRight='4px'
      style={{
        fontWeight: 700,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
