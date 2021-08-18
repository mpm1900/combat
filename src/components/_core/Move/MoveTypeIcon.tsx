import { ReactComponent as Physical } from '../../../icons/darkzaitzev/revolt.svg'
import { ReactComponent as Special } from '../../../icons/lorc/magic-swirl.svg'
import { FunctionComponent } from 'react'
import { AttackTypes } from '../../../types/character/character'
import { BoxProps } from '../Box'
import { Icon } from '../Icon'
import { theme } from '../../../theme'

const iconMap: Record<AttackTypes, FunctionComponent> = {
  physical: Physical,
  special: Special,
}

const colorMap: Record<AttackTypes, string> = {
  physical: theme.physicalTextColor,
  special: theme.specialTextColor,
}

export type TypeIconProps = BoxProps & {
  type: AttackTypes
}
export const TypeIcon = (props: TypeIconProps) => {
  const { type, color, ...rest } = props
  const Name = iconMap[type]
  return (
    <Icon color={color || colorMap[type]} {...rest}>
      <Name />
    </Icon>
  )
}

TypeIcon.defaultProps = {
  height: '32px',
  width: '32px',
}
