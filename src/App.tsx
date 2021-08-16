import { useEffect } from 'react'
import { v4 } from 'uuid'
import { Box } from './components/_core/Box'
import { useCombatSystem } from './contexts/CombatSystemContext'
import { Combat } from './domain'
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
      <Combat />
    </Box>
  )
}

export default App
