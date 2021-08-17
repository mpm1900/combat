import { FunctionComponent } from 'react'
import { MoveTarget } from '../../../types/move'
import { BoxProps } from '../Box'
import { Icon } from '../Icon'
import { ReactComponent as SingleTarget } from '../../icons/delapouite/character.svg'
import { ReactComponent as OpponentParty } from '../../icons/delapouite/team-upgrade.svg'

export type TargetTypeIconProps = BoxProps & {
  type: MoveTarget
}

export const TargetTypeIcon = (props: TargetTypeIconProps) => {
  const { type, ...rest } = props
  // const Component = iconMap[type]
  return <Icon {...rest}></Icon>
}
