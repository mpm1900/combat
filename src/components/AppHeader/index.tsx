import { PropsWithChildren } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { theme } from '../../theme'
import { Box } from '../_core/Box'

export const AppHeader = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const { push } = useHistory()
  const { init } = useCombatSystem()
  return (
    <Box
      color='rgba(255,255,255,0.36)'
      height='24px'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      background={theme.boxGradient}
      borderBottom='1px solid rgba(255,255,255,0.36)'
      marginBottom='1px'
      padding='0 8px'
      style={{
        fontFamily: 'Roboto Mono',
        fontSize: '14px',
      }}
    >
      <Box>Combat Simulator - version: 0.0.7-a</Box>
      <Box flexDirection='row' alignItems='center'>
        <Link
          to='/party'
          style={{ color: 'rgba(255,255,255,0.36)', marginRight: 4 }}
        >
          Edit Party
        </Link>
      </Box>
    </Box>
  )
}
