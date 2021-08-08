import { useState } from 'react'
import { Status } from '../../types/status/status'
import { Box } from '../_core/Box'
import { StatusCard } from '../_core/StatusCard'
import { StatusIcon } from '../_core/StatusIcon'
import { Tooltip } from '../_core/Tooltip'

export type CombatCharacterStatusProps = {
  status: Status
}

export const CombatCharacterStatus = (props: CombatCharacterStatusProps) => {
  const { status } = props
  const [isHovering, setIsHovering] = useState(false)
  return (
    <Box
      marginLeft='4px'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip
        isOpen={isHovering}
        content={<StatusCard status={status} />}
        options={{
          placement: 'bottom-center',
          triggerOffset: 4,
        }}
      >
        <Box padding='4px 2px'>
          <StatusIcon status={status} color='white' />
        </Box>
      </Tooltip>
    </Box>
  )
}
