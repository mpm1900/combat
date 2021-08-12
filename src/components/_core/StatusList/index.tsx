import { PropsWithChildren, useState } from 'react'
import { Status } from '../../../types/status/status'
import { StatusTargetIcon } from '../../Move/StatusTargetIcon'
import { Box } from '../Box'
import { StatusCard } from '../StatusCard'
import { Tooltip } from '../Tooltip'
import { StatusChance, StatusName, StatusWrapper, Wrapper } from './style'

export type StatusListProps = {
  statuses: Status[] | undefined
  type: 'target' | 'source'
  showIcon?: boolean
}
export const StatusList = (props: StatusListProps) => {
  const { statuses, type, showIcon = true } = props
  return statuses?.length ? (
    <Wrapper>
      {showIcon && (
        <Box paddingTop='2px' marginRight='4px'>
          <StatusTargetIcon type={type} />
        </Box>
      )}
      <Box flexDirection='row' flexWrap='wrap'>
        {statuses.map((status, i) => (
          <StatusListItem status={status}>
            {i !== statuses.length - 1 ? ',' : ''}
          </StatusListItem>
        ))}
      </Box>
    </Wrapper>
  ) : null
}

export type StatusListItemProps = {
  status: Status
}
export const StatusListItem = (
  props: PropsWithChildren<StatusListItemProps>,
) => {
  const { status, children } = props
  const [isHovering, setIsHovering] = useState(false)
  return (
    <StatusWrapper
      isPositive={status.isPositive}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {status.applyChance < 1 && (
        <StatusChance>({(status.applyChance * 100).toFixed(0)}%)</StatusChance>
      )}
      <Tooltip
        isOpen={isHovering}
        content={<StatusCard status={status} />}
        options={{
          auto: true,
          placement: 'bottom-center',
          triggerOffset: 4,
        }}
      >
        <StatusName isHovering={isHovering}>{status.name}</StatusName>
      </Tooltip>
      {children}
    </StatusWrapper>
  )
}
