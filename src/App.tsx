import { useEffect } from 'react'
import { v4 } from 'uuid'
import { CombatBody } from './components/CombatBody'
import { CombatHeader } from './components/CombatHeader'
import { CombatParties } from './components/CombatParties'
import { Box } from './components/_core/Box'
import { useCombat } from './contexts/CombatContext'
import { Blastoise } from './types/character/data/entities/blastoise'
import { Charizard } from './types/character/data/entities/charizard'
import { Golem } from './types/character/data/entities/golem'
import { Pidgeot } from './types/character/data/entities/pidgeot'
import { Raichu } from './types/character/data/entities/raichu'
import { Venusaur } from './types/character/data/entities/venusaur'
import { Party } from './types/character/party'

const party = (): Party => ({
  id: v4(),
  characters: [Charizard(), Venusaur(), Blastoise()],
})

const enemies = (): Party => ({
  id: v4(),
  characters: [Raichu(), Golem(), Pidgeot()],
})

function App() {
  const { init } = useCombat()

  useEffect(() => {
    init([party(), enemies()])
  }, [])

  return (
    <Box className='App' flex={1}>
      <CombatHeader />
      <CombatParties>
        <CombatBody />
      </CombatParties>
    </Box>
  )
}

export default App
