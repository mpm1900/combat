import { ReactComponent as Target } from '../../icons/delapouite/fast-forward-button.svg'
import { ReactComponent as Source } from '../../icons/delapouite/fast-backward-button.svg'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

export type StatusTargetType = 'target' | 'source'

const iconMap: Record<StatusTargetType, FunctionComponent> = {
  target: Target,
  source: Source,
}

const colorMap: Record<StatusTargetType, string> = {
  target: 'rgba(255,255,255,0.45)',
  source: 'rgba(255,255,255,0.45)',
}

const Wrapper = styled.div<{ color: string }>`
  height: 16px;
  width: 16px;
  margin-right: 4px;
  path {
    fill: ${(p) => p.color};
  }
`

export type StatusTargetIconProps = {
  type: StatusTargetType
  color?: string
}
export const StatusTargetIcon = (props: StatusTargetIconProps) => {
  const { type, color } = props
  const Name = iconMap[type]
  return (
    <Wrapper color={color || colorMap[type]}>
      <Name />
    </Wrapper>
  )
}
