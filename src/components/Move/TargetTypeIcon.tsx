import { FunctionComponent } from 'react'
import { MoveTarget } from '../../types/move'
import { BoxProps } from '../_core/Box'
import { Icon } from '../_core/Icon'
import { ReactComponent as SingleTarget } from '../../icons/delapouite/character.svg'
import { ReactComponent as OpponentParty } from '../../icons/delapouite/team-upgrade.svg'

const iconMap: Record<MoveTarget, FunctionComponent> = {
  all: () => <span>all</span>,
  self: () => <span>self</span>,
  'controlled-party': () => <span>cp</span>,
  'controlled-splash': () => <span>cs</span>,
  'controlled-target': SingleTarget,
  'uncontrolled-party': OpponentParty,
  'uncontrolled-splash': () => <span>us</span>,
  'uncontrolled-target': SingleTarget,
}

export type TargetTypeIconProps = BoxProps & {
  type: MoveTarget
}

export const TargetTypeIcon = (props: TargetTypeIconProps) => {
  const { type, ...rest } = props
  const Component = iconMap[type]
  return (
    <Icon {...rest}>
      <Component />
    </Icon>
  )
}
