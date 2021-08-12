import { useMemo } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { theme } from '../../theme'
import { Character } from '../../types/character/character'
import {
  getImmunities,
  getStats,
  getStatuses,
} from '../../types/character/util'
import { min } from '../../types/equation'
import { Bar } from '../_core/Bar'
import { Box } from '../_core/Box'
import { colorMap, ElementalIcon } from '../_core/ElementalIcon'
import { Hexagon } from '../_core/Hexagon'
import { ImmunityCard } from '../_core/ImmunityCard'
import { CombatCharacterStatus } from './CombatCharacterStatus'
import { ReactComponent as Accuracy } from '../../icons/lorc/archery-target.svg'
import { ReactComponent as Attack } from '../../icons/lorc/battered-axe.svg'
import { ReactComponent as Defense } from '../../icons/sbed/shield.svg'
import { Icon } from '../_core/Icon'

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
        width='256px'
        background={theme.boxGradient}
        border='1px solid rgba(255,255,255,0.56)'
        margin='36px 0 0 32px'
        flexDirection='row'
      >
        <Box>
          <Hexagon
            color={colorMap[character.elements[0].element]}
            borderColor='rgba(255,255,255,0.56)'
            borderWidth={2}
            size={80}
            style={{
              margin: '16px 0 0 -32px',
            }}
          />
        </Box>
        <Box flex={1}>
          <Box>
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
          <Box
            flexDirection='row'
            color='white'
            alignItems='center'
            justifyContent='center'
            padding='4px'
            style={{ fontWeight: 700, fontSize: '14px' }}
          >
            <Box flexDirection='row' alignItems='center' marginRight='8px'>
              <Icon width='16px' color='white'>
                <Accuracy />
              </Icon>
              <span style={{ color: theme.physicalColor }}>
                {stats.physicalAccuracy}
              </span>
              <span> / </span>
              <span style={{ color: theme.specialColor }}>
                {stats.specialAccuracy}
              </span>
            </Box>
            <Box flexDirection='row' alignItems='center' marginRight='8px'>
              <Icon width='16px' color='white' marginRight='2px'>
                <Attack />
              </Icon>
              <span style={{ color: theme.physicalColor }}>
                {stats.physicalAttack}
              </span>
              <span> / </span>
              <span style={{ color: theme.specialColor }}>
                {stats.specialAttack}
              </span>
            </Box>
            <Box flexDirection='row' alignItems='center'>
              <Icon width='16px' color='white'>
                <Defense />
              </Icon>
              <span style={{ color: theme.physicalColor }}>
                {stats.physicalDefense}
              </span>
              <span> / </span>
              <span style={{ color: theme.specialColor }}>
                {stats.specialDefense}
              </span>
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
        justifyContent='space-between'
        color='white'
        flexDirection='row'
        height='28px'
      >
        <Box flexDirection='row'>
          {getImmunities(character).map((status) => (
            <CombatCharacterStatus key={status.id} status={status} color='plum'>
              <ImmunityCard status={status} />
            </CombatCharacterStatus>
          ))}
        </Box>
        <Box flexDirection='row' justifyContent='flex-end'>
          {getStatuses(character).map((status) => (
            <CombatCharacterStatus key={status.id} status={status} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
