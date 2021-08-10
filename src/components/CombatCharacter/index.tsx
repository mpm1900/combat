import { useMemo } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { theme } from '../../theme'
import { Character } from '../../types/character/character'
import { getStats } from '../../types/character/util'
import { min } from '../../types/equation'
import { Bar } from '../_core/Bar'
import { Box } from '../_core/Box'
import { colorMap, ElementalIcon } from '../_core/ElementalIcon'
import { Hexagon } from '../_core/Hexagon'
import { CombatCharacterStatus } from './CombatCharacterStatus'

export type CombatCharacterProps = {
  character: Character
  side: 'left' | 'right'
}

export const CombatCharacter = (props: CombatCharacterProps) => {
  const { character, side } = props
  const { getActiveCharacter } = useCombat()
  const activeCharacter = getActiveCharacter()
  const isActive = character.id === activeCharacter?.id
  const stats = useMemo(() => getStats(character), [character])
  const currentHealth = min(stats.health - character.damage, 0)
  const currentEnergy = min(stats.energy - character.energyOffset, 0)
  return (
    <Box
      style={
        {
          //transform: isActive ? 'scale(1.2)' : '',
          //marginLeft: isActive ? '-24px' : '',
        }
      }
    >
      <Box
        width='240px'
        background='linear-gradient(
        198deg,
        rgba(45, 47, 56, 1) 0%,
        rgba(80, 94, 116, 1) 100%
      )'
        border='1px solid rgba(255,255,255,0.56)'
        margin='36px 0 0 32px'
        flexDirection='row'
      >
        <Hexagon
          color={colorMap[character.elements[0].element]}
          borderColor='rgba(255,255,255,0.56)'
          borderWidth={2}
          size={72}
          style={{
            margin: '14px 0 0 -32px',
          }}
        />
        <Box flex={1}>
          <Box padding='4px' minHeight='36px'>
            <Box
              color='white'
              alignItems='center'
              flexDirection='row'
              marginLeft='4px'
            >
              {character.elements.map((element) => (
                <ElementalIcon
                  type={element.element}
                  height='20px'
                  width='20px'
                />
              ))}
              <Box
                marginLeft='6px'
                paddingTop='4px'
                style={{
                  textShadow: '0 1px 3px rgba(0,0,0,0.56)',
                  fontFamily: 'Trade Winds',
                }}
              >
                {character.name}
              </Box>
            </Box>
          </Box>
          <Bar
            value={currentHealth}
            max={stats.health}
            height='12px'
            background={theme.healthBarRed}
            border='1px solid rgba(0,0,0,0.45)'
            marginLeft='-8px'
            color='rgba(0,0,0,0.56)'
            style={{
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            {currentHealth}/{stats.health}
          </Bar>
          <Bar
            value={currentEnergy}
            max={stats.energy}
            height='12px'
            background={theme.energyBarGreen}
            border='1px solid rgba(0,0,0,0.45)'
            borderTop='none'
            marginLeft='-32px'
            paddingRight='4px'
            color='rgba(0,0,0,0.56)'
            style={{
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            {currentEnergy}/{stats.energy}
          </Bar>
        </Box>
      </Box>
      <Box
        justifyContent={side === 'left' ? 'flex-end' : 'flex-start'}
        color='white'
        flexDirection='row'
        height='28px'
      >
        {character.statuses.map((status) => (
          <CombatCharacterStatus key={status.id} status={status} />
        ))}
      </Box>
    </Box>
  )
}
