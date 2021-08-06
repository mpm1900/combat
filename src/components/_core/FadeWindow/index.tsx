import { config, useTransition } from 'react-spring'
import { Box, BoxProps } from '../Box'

export type FadeWindowProps = BoxProps & {}

export const FadeWindow = (props: FadeWindowProps) => {
  const { children, ...rest } = props
  const transition = useTransition([children], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.slow,
  })
  return (
    <Box {...rest} flex={1} width='100%' position='relative'>
      {transition((styles, child) => (
        <Box
          position='absolute'
          style={{
            ...styles,
            inset: '1px',
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  )
}
