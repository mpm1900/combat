import { SpringValue } from '@react-spring/core'
import { SpringConfig, useSpring } from 'react-spring'
import { Box, BoxProps } from '../Box'

export interface AnimatedNumberProps extends Omit<BoxProps, 'children'> {
  value: SpringValue<number>
}

export const AnimatedNumber = (props: AnimatedNumberProps) => {
  const { value, ...rest } = props
  return <Box {...rest}>{value.to((v) => v.toFixed(0))}</Box>
}

export type AnimatedNumberValueProps = Omit<BoxProps, 'children'> & {
  children: number
  config?: SpringConfig
}

export const AnimatedNumberValue = (props: AnimatedNumberValueProps) => {
  const { children, config } = props
  const { value } = useSpring({
    value: children,
    config,
  })
  return <AnimatedNumber value={value} />
}
