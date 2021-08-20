import { useEffect } from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import { Box } from './components/_core/Box'
import { useCombatSystem } from './contexts/CombatSystemContext'

import { Darkrai } from './types/character/data/entities/darkrai'
import { Golem } from './types/character/data/entities/golem'
import { Pidgeot } from './types/character/data/entities/pidgeot'
import { Raichu } from './types/character/data/entities/raichu'
import { Party } from './types/character/party'
import Forest from './assets/2.png'
import { Routes } from './routes'
import { AppHeader } from './components/AppHeader'
import { Venusaur } from './types/character/data/entities/venusaur'

const enemies = (): Party => ({
  id: v4(),
  characters: [Raichu(), Darkrai(), Venusaur(), Pidgeot()],
})

function App() {
  const { init } = useCombatSystem()

  useEffect(() => {
    init(enemies())
  }, [])

  return (
    <Box
      className='App'
      height='100%'
      width='100%'
      flex={1}
      background={`url(${Forest})`}
      backgroundSize='cover'
    >
      <Box background='rgba(0,0,20,0.72)' flex={1} height='100%' width='100%'>
        <AppHeader />
        <Routes />
      </Box>
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
