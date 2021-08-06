import { SpringValue } from '@react-spring/core'
import { Box, BoxProps } from '../Box'

export interface AnimatedNumberProps extends Omit<BoxProps, 'children'> {
  value: SpringValue<number>
}

export const AnimatedNumber = (props: AnimatedNumberProps) => {
  const { value, ...rest } = props
  return <Box {...rest}>{value.to((v) => v.toFixed(0))}</Box>
}
