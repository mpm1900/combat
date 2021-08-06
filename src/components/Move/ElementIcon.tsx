import { ElementalType } from '../../types/elemental'
import { ReactComponent as Fire } from '../../icons/sbed/flamer.svg'
import { ReactComponent as Water } from '../../icons/lorc/drop.svg'
import { ReactComponent as Thunder } from '../../icons/lorc/power-lightning.svg'
import { ReactComponent as Grass } from '../../icons/delapouite/oak-leaf.svg'
import { ReactComponent as Earth } from '../../icons/delapouite/stone-pile.svg'
import { ReactComponent as Air } from '../../icons/lorc/fluffy-wing.svg'
import { ReactComponent as Ghost } from '../../icons/lorc/spectre.svg'
import { ReactComponent as Dark } from '../../icons/sbed/death-skull.svg'
import { ReactComponent as Light } from '../../icons/sbed/pulse.svg'

import { FunctionComponent } from 'react'
import styled from 'styled-components'

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

const Wrapper = styled.div<{ color: string }>`
  height: 24px;
  width: 24px;
  path {
    fill: ${(p) => p.color};
  }
`

export type ElementIconProps = {
  type: ElementalType
  color?: string
}
export const ElementIcon = (props: ElementIconProps) => {
  const { type, color } = props
  const Name = iconMap[type]
  return (
    <Wrapper color={color || colorMap[type]}>
      <Name />
    </Wrapper>
  )
}
