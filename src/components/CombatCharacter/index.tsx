import { useMemo } from 'react'
import { Character } from '../../types/character/character'
import { getStats } from '../../types/character/util'
import { min } from '../../types/equation'
import { colorMap } from '../Move/ElementIcon'
import { Bar } from '../_core/Bar'
import { Box } from '../_core/Box'
import { Hexagon } from '../_core/Hexagon'
import { CombatCharacterStatus } from './CombatCharacterStatus'

export type CombatCharacterProps = {
  character: Character
}

export const CombatCharacter = (props: CombatCharacterProps) => {
  const { character } = props
  const stats = useMemo(() => getStats(character), [character])
  const currentHealth = min(stats.health - character.damage, 0)
  const currentEnergy = min(stats.energy - character.energyOffset, 0)
  return (
    <Box>
      <Box
        width='240px'
        background='linear-gradient(
        198deg,
        rgba(45, 47, 56, 1) 0%,
        rgba(80, 94, 116, 1) 100%
      )'
        border='1px solid rgba(255,255,255,0.56)'
        margin='36px 0 0 24px'
        flexDirection='row'
      >
        <Hexagon
          color={colorMap[character.elements[0].element]}
          borderColor='rgba(255,255,255,0.56)'
          borderWidth={2}
          size={72}
          style={{
            margin: '10px 0 0 -24px',
          }}
        />
        <Box flex={1}>
          <Box padding='4px'>
            <Box color='white'>
              <strong style={{ textShadow: '0 1px 3px rgba(0,0,0,0.56)' }}>
                {character.name}
              </strong>
            </Box>
          </Box>
          <Bar
            value={currentHealth}
            max={stats.health}
            height='16px'
            background='lightcoral'
            border='1px solid rgba(0,0,0,0.45)'
            marginLeft='-8px'
            color='rgba(0,0,0,0.56)'
            style={{
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {currentHealth}/{stats.health}
          </Bar>
          <Bar
            value={currentEnergy}
            max={stats.energy}
            height='12px'
            background='darkseagreen'
            border='1px solid rgba(0,0,0,0.45)'
            borderTop='none'
            marginLeft='-16px'
            paddingRight='4px'
            color='rgba(0,0,0,0.56)'
            style={{
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {currentEnergy}/{stats.energy}
          </Bar>
        </Box>
      </Box>
      <Box justifyContent='flex-end' color='white' flexDirection='row'>
        {character.statuses.map((status) => (
          <CombatCharacterStatus key={status.id} status={status} />
        ))}
      </Box>
    </Box>
  )
}
