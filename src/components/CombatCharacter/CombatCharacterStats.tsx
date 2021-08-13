import { theme } from '../../theme'
import { Box, BoxProps } from '../_core/Box'
import { Icon } from '../_core/Icon'

export type CombatCharacterStatsProps = BoxProps & {
  physical: string
  special: string
  icon: JSX.Element
}

export const CombatCharacterStats = (props: CombatCharacterStatsProps) => {
  const { physical, special, icon, ...rest } = props
  return (
    <Box
      {...rest}
      alignItems='center'
      justifyContent='space-between'
      flexDirection='row'
      color='white'
      style={{
        fontSize: '12px',
      }}
    >
      <Icon width='16px' color='white' marginRight='3px'>
        {icon}
      </Icon>
      <Box
        alignItems='center'
        justifyContent='space-between'
        flexDirection='row'
        style={{
          textShadow: '0px 1px 2px rgba(0,0,0,0.72)',
        }}
      >
        <Box
          background={theme.physicalColor}
          borderRadius='4px 0 0 4px'
          padding='0px 4px'
        >
          {physical}
        </Box>
        <Box
          background={theme.specialColor}
          borderRadius='0 4px 4px 0'
          padding='0px 4px'
        >
          {special}
        </Box>
      </Box>
    </Box>
  )
}
