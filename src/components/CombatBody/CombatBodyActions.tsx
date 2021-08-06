import { useSpring } from 'react-spring'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { Move } from '../Move'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'

export type CombatBodyActionsProps = {}

export const CombatBodyActions = (props: CombatBodyActionsProps) => {
  const { getActiveCharacter } = useCombat()
  const { bufferMove } = useCombatBuffer()
  const character = getActiveCharacter()
  return (
    <Box flex='1' overflow='auto'>
      <Box>
        <h2 style={{ color: 'white', textAlign: 'center' }}>
          Select an Action
        </h2>
        <Box
          flex='1'
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
          overflow='auto'
        >
          {character?.moves?.map((move) => (
            <Move key={move.id} move={move} character={character}>
              <Button
                marginTop='8px'
                onClick={() => {
                  bufferMove(move)
                }}
              >
                Select
              </Button>
            </Move>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
