import { useState } from 'react'
import styled from 'styled-components'
import { Ability } from '../../types/ability/ability'
import { Status } from '../../types/status/status'
import { AbilityCard } from '../_core/AbilityCard'
import { Box, BoxProps } from '../_core/Box'
import { StatusCard } from '../_core/StatusCard'
import { StatusIcon } from '../_core/StatusIcon'
import { Tooltip } from '../_core/Tooltip'
import { TooltipCard } from '../_core/TooltipCard'

const AbilityText = styled(Box)<{ isHovering: boolean }>((p) => ({
  color: 'rgba(255,255,255,0.63)',
  ':hover': {
    color: 'white',
    textDecoration: 'underline',
  },
  ...(p.isHovering ? { color: 'white', textDecoration: 'underline' } : {}),
}))

export type CombatCharacterAbilityProps = BoxProps & {
  ability: Ability
}

export const CombatCharacterAbility = (props: CombatCharacterAbilityProps) => {
  const { ability, color = 'white', children, ...rest } = props
  const [isHovering, setIsHovering] = useState(false)
  return (
    <Box
      marginRight='4px'
      {...rest}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip
        isOpen={isHovering}
        content={children || ((<AbilityCard ability={ability} />) as any)}
        options={{
          placement: 'bottom-center',
          triggerOffset: 4,
          auto: true,
        }}
      >
        <AbilityText isHovering={isHovering}>{ability.name}</AbilityText>
      </Tooltip>
    </Box>
  )
}
