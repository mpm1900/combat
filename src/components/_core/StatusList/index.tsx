import { PropsWithChildren, useState } from 'react'
import { Status, StatusStackItem } from '../../../types/status/status'
import { convertStatusesToStack } from '../../../types/status/util'
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
  const stack = convertStatusesToStack(statuses || [])
  return (
    <>
      {stack.length > 0 && (
        <Wrapper>
          {showIcon && (
            <Box paddingTop='2px' marginRight='4px'>
              <StatusTargetIcon type={type} />
            </Box>
          )}
          <Box flexDirection='row' flexWrap='wrap'>
            {stack.map((item, i) => (
              <StatusListItem item={item}>
                {i !== stack.length - 1 ? ',' : ''}
              </StatusListItem>
            ))}
          </Box>
        </Wrapper>
      )}
    </>
  )
}

export type StatusListItemProps = {
  item: StatusStackItem
}
export const StatusListItem = (
  props: PropsWithChildren<StatusListItemProps>,
) => {
  const { item, children } = props
  const { status, count } = item
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
        <StatusName isHovering={isHovering}>
          {status.name} {count > 1 ? `x${count}` : ''}
        </StatusName>
      </Tooltip>
      {children}
    </StatusWrapper>
  )
}
