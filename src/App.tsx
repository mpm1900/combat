import { useEffect } from 'react'
import { v4 } from 'uuid'
import { CombatBody } from './components/CombatBody'
import { CombatHeader } from './components/CombatHeader'
import { CombatParty } from './components/CombatParties'
import { Box } from './components/_core/Box'
import { useCombatSystem } from './contexts/CombatSystemContext'
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
      <CombatHeader />
      <Box flex='1' overflow='hidden' flexDirection='row'>
        <CombatParty index={0} side='left' />
        <CombatBody />
        <CombatParty index={1} side='right' />
      </Box>
    </Box>
  )
}

export default App
