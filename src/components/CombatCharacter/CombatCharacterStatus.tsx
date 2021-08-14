import { useState } from 'react'
import { Status, StatusStackItem } from '../../types/status/status'
import { Box, BoxProps } from '../_core/Box'
import { StatusCard } from '../_core/StatusCard'
import { StatusIcon } from '../_core/StatusIcon'
import { Tooltip } from '../_core/Tooltip'

export type CombatCharacterStatusProps = BoxProps & {
  item: StatusStackItem
}

export const CombatCharacterStatus = (props: CombatCharacterStatusProps) => {
  const { item, color = 'white', children, ...rest } = props
  const { status, count } = item
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
        <Box padding='4px 2px' flexDirection='row'>
          <StatusIcon status={status} color={color} />
          {count > 1 && <span>({count})</span>}
        </Box>
      </Tooltip>
    </Box>
  )
}
