import { useState } from 'react'
import { PartyCharacterProps } from '.'
import { theme } from '../../theme'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { MoveTable } from './MoveTable'

type TabType = 'moves' | 'items'

export const PartyCharacterTables = (props: PartyCharacterProps) => {
  const { character } = props
  const [activeTab, setActiveTab] = useState<TabType>('moves')
  return (
    <Box marginLeft='16px' flex='1' overflow='hidden'>
      <Box overflow='hidden'>
        <Box flexDirection='row'>
          <Button
            isHovering={activeTab === 'moves'}
            margin='8px 8px 8px 0'
            onClick={() => setActiveTab('moves')}
          >
            Moves
          </Button>
          <Button
            isHovering={activeTab === 'items'}
            margin='8px 8px 8px 0'
            onClick={() => setActiveTab('items')}
          >
            Items
          </Button>
        </Box>
        <Box
          flex='1'
          background={theme.boxGradient}
          border={`1px solid ${theme.white3}`}
          overflow='auto'
        >
          {activeTab === 'moves' && <MoveTable character={character} />}
          {activeTab === 'items' && <Box>Items</Box>}
        </Box>
      </Box>
    </Box>
  )
}
