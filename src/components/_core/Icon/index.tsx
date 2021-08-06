import styled from 'styled-components'
import { Box, BoxProps } from '../Box'

export type IconProps = BoxProps

const Wrapper = styled(Box)`
  path {
    fill: ${(p) =>
      p.color && typeof p.color === 'string' ? p.color : 'inherit'};
  }
`

export const Icon = (props: IconProps) => {
  const { children, ...rest } = props
  return <Wrapper {...rest}>{children}</Wrapper>
}
