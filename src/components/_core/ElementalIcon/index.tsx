import { ElementalType } from '../../../types/elemental'
import { BoxProps } from '../Box'
import { ReactComponent as Fire } from '../../../icons/sbed/flamer.svg'
import { ReactComponent as Water } from '../../../icons/lorc/drop.svg'
import { ReactComponent as Thunder } from '../../../icons/lorc/power-lightning.svg'
import { ReactComponent as Grass } from '../../../icons/delapouite/oak-leaf.svg'
import { ReactComponent as Earth } from '../../../icons/delapouite/stone-pile.svg'
import { ReactComponent as Air } from '../../../icons/lorc/fluffy-wing.svg'
import { ReactComponent as Ghost } from '../../../icons/lorc/spectre.svg'
import { ReactComponent as Dark } from '../../../icons/sbed/death-skull.svg'
import { ReactComponent as Light } from '../../../icons/sbed/pulse.svg'
import { FunctionComponent } from 'react'
import { Icon } from '../Icon'

const iconMap: Record<ElementalType, FunctionComponent> = {
  fire: Fire,
  water: Water,
  grass: Grass,
  earth: Earth,
  thunder: Thunder,
  air: Air,
  ghost: Ghost,
  dark: Dark,
  light: Light,
}

export const colorMap: Record<ElementalType, string> = {
  fire: 'salmon',
  water: 'CornflowerBlue',
  grass: 'lightgreen',
  earth: 'tan',
  thunder: 'gold',
  air: 'aliceblue',
  ghost: 'mediumpurple',
  dark: 'lightslategrey',
  light: 'lightyellow',
}

export type ElementalIconProps = BoxProps & {
  type: ElementalType
}

export const ElementalIcon = (props: ElementalIconProps) => {
  const { type, color, ...rest } = props
  const Body = iconMap[type]
  return (
    <Icon {...rest} color={colorMap[type] || color}>
      <Body />
    </Icon>
  )
}

ElementalIcon.defaultProps = {
  height: '32px',
  width: '32px',
}
