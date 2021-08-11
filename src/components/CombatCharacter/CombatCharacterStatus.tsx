import { useState } from 'react'
import { Status } from '../../types/status/status'
import { Box, BoxProps } from '../_core/Box'
import { StatusCard } from '../_core/StatusCard'
import { StatusIcon } from '../_core/StatusIcon'
import { Tooltip } from '../_core/Tooltip'

export type CombatCharacterStatusProps = BoxProps & {
  status: Status
}

export const CombatCharacterStatus = (props: CombatCharacterStatusProps) => {
  const { status, color = 'white', children, ...rest } = props
  const [isHovering, setIsHovering] = useState(false)
  return (
    <Box
      marginLeft='4px'
      {...rest}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip
        isOpen={isHovering}
        content={children || ((<StatusCard status={status} />) as any)}
        options={{
          placement: 'bottom-center',
          triggerOffset: 4,
          auto: true,
        }}
      >
        <Box padding='4px 2px'>
          <StatusIcon status={status} color={color} />
        </Box>
      </Tooltip>
    </Box>
  )
}
