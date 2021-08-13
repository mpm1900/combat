import { ReactComponent as Target } from '../../icons/delapouite/fast-forward-button.svg'
import { ReactComponent as Source } from '../../icons/delapouite/fast-backward-button.svg'
import { FunctionComponent } from 'react'
import { Icon } from '../_core/Icon'
import { BoxProps } from '../_core/Box'

export type StatusTargetType = 'target' | 'source'

const iconMap: Record<StatusTargetType, FunctionComponent> = {
  target: Target,
  source: Source,
}

const colorMap: Record<StatusTargetType, string> = {
  target: 'rgba(255,255,255,0.45)',
  source: 'rgba(255,255,255,0.45)',
}

export type StatusTargetIconProps = BoxProps & {
  type: StatusTargetType
}
export const StatusTargetIcon = (props: StatusTargetIconProps) => {
  const { type, color, ...rest } = props
  const Name = iconMap[type]
  return (
    <Icon
      height='16px'
      width='16px'
      marginRight='4px'
      color={color || colorMap[type]}
      {...rest}
    >
      <Name />
    </Icon>
  )
}
