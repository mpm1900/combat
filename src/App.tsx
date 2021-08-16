import { useEffect } from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import { Box } from './components/_core/Box'
import { useCombatSystem } from './contexts/CombatSystemContext'
import { Combat } from './domain'
import { theme } from './theme'
import { Darkrai } from './types/character/data/entities/darkrai'
import { Golem } from './types/character/data/entities/golem'
import { Pidgeot } from './types/character/data/entities/pidgeot'
import { Raichu } from './types/character/data/entities/raichu'
import { Party } from './types/character/party'

const enemies = (): Party => ({
  id: v4(),
  characters: [Raichu(), Darkrai(), Golem(), Pidgeot()],
})

function App() {
  const { init } = useCombatSystem()

  useEffect(() => {
    init(enemies())
  }, [])

  return (
    <Box className='App' flex={1}>
      <Box
        color='rgba(255,255,255,0.36)'
        height='24px'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        background={theme.boxGradient}
        borderBottom='1px solid rgba(255,255,255,0.54)'
        marginBottom='1px'
        padding='0 8px'
        style={{
          fontFamily: 'Roboto Mono',
          fontSize: '14px',
        }}
      >
        <Box>Combat Simulator - version: 0.0.4-a</Box>
        <Reset onClick={() => init(enemies())}>reset</Reset>
      </Box>
      <Combat />
    </Box>
  )
}

const Reset = styled(Box)({
  cursor: 'pointer',
  ':hover': {
    color: 'white',
  },
})

export default App
