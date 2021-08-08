import { FunctionComponent } from 'react'
import { Status } from '../../../types/status/status'
import { BoxProps } from '../Box'
import { Icon } from '../Icon'
import { ReactComponent as Dazed } from '../../../icons/lorc/star-swirl.svg'
import { ReactComponent as Shocked } from '../../../icons/lorc/lightning-trio.svg'
import { ReactComponent as Burned } from '../../../icons/carl-olsen/flame.svg'
import { ReactComponent as Na } from '../../../icons/delapouite/perspective-dice-six-faces-random.svg'

const iconMap: Record<string, FunctionComponent> = {
  Burned: Burned,
  Dazed: Dazed,
  Shocked: Shocked,
}

export type StatusIconProps = BoxProps & {
  status: Status
}

export const StatusIcon = (props: StatusIconProps) => {
  const { status, ...rest } = props
  const Body = iconMap[status.name] || Na
  return (
    <Icon {...rest}>
      <Body />
    </Icon>
  )
}

StatusIcon.defaultProps = {
  height: '20px',
  width: '20px',
}
