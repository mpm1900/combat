import { ReactComponent as Physical } from '../../icons/darkzaitzev/revolt.svg'
import { ReactComponent as Special } from '../../icons/lorc/magic-swirl.svg'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { AttackTypes } from '../../types/character/character'

const iconMap: Record<AttackTypes, FunctionComponent> = {
  physical: Physical,
  special: Special,
}

const colorMap: Record<AttackTypes, string> = {
  physical: 'white',
  special: 'white',
}

const Wrapper = styled.div<{ color: string }>`
  height: 32px;
  width: 32px;
  path {
    fill: ${(p) => p.color};
  }
`

export type TypeIconProps = {
  type: AttackTypes
  color?: string
}
export const TypeIcon = (props: TypeIconProps) => {
  const { type, color } = props
  const Name = iconMap[type]
  return (
    <Wrapper color={color || colorMap[type]}>
      <Name />
    </Wrapper>
  )
}
