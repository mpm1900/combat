import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { theme } from '../../theme'
import { Character } from '../../types/character/character'
import { Box, BoxProps } from '../_core/Box'
import { Hexagon } from '../_core/Hexagon'

export type CombatCharacterBadgesProps = BoxProps & {
  character: Character
}

export const CombatCharacterBadges = (props: CombatCharacterBadgesProps) => {
  const { character, ...rest } = props
  const { getCharacterStats } = useCombatSystem()
  const stats = getCharacterStats(character.id)
  return (
    <Box {...rest} position='relative'>
      <Badge size={36} color='darkseagreen' top='-12px' left='-38px'>
        {character.level}
      </Badge>
      <Badge size={36} top='6px' left='-67px' color='lightblue'>
        {stats.speed}
      </Badge>
      <Badge top='-10px' left='-95px' color='lightgreen'>
        {stats.evasion}%
      </Badge>
      {stats.specialArmor > 0 && (
        <Badge top='-25px' left='-121px' color={theme.specialColor}>
          {stats.specialArmor}
        </Badge>
      )}
      {stats.physicalArmor > 0 && (
        <Badge top='-55px' left='-121px' color={theme.physicalColor}>
          {stats.physicalArmor}
        </Badge>
      )}
    </Box>
  )
}

const Badge = (props: BoxProps & { size?: number }) => {
  const { children, color, size = 32, ...rest } = props
  return (
    <Box
      position='absolute'
      height='56px'
      width='56px'
      zIndex={2}
      alignItems='center'
      justifyContent='center'
      style={{
        fontFamily: 'Trade Winds',
        fontSize: '12px',
      }}
      {...rest}
    >
      <Hexagon
        size={size}
        color='rgba(37, 39, 60, 1)'
        borderWidth={2}
        borderColor='rgba(255,255,255,0.54)'
        style={{
          transform: 'rotate(30deg)',
        }}
      />
      <Box
        position='absolute'
        zIndex={2}
        marginTop='4px'
        color={color || 'white'}
      >
        {children}
      </Box>
    </Box>
  )
}
