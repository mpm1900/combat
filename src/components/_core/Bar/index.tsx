import { useSpring } from 'react-spring'
import { usePrevious } from '../../../hooks/usePrevious'
import { Box, BoxProps } from '../Box'

export type BarProps = BoxProps & {
  value: number
  max: number
  min?: number
}

export const Bar = (props: BarProps) => {
  const { value, max, min = 0, children, background, ...rest } = props
  const previous = usePrevious(value) || 0
  const percent = (value / (max - min)) * 100

  const barSpeed = previous > value ? 0 : 2000
  const barStyles = useSpring({
    width: `${percent}%`,
    config: {
      duration: barSpeed,
    },
  })

  const deltaSpeed = previous <= value ? 0 : 2000
  const deltaStyles = useSpring({
    width: `${percent}%`,
    config: {
      duration: deltaSpeed,
    },
  })

  return (
    <Box {...rest} position='relative' background='rgba(0,0,0,0.36)' zIndex={1}>
      <Box
        position='absolute'
        top='0px'
        bottom='0px'
        background={'white'}
        zIndex={1}
        style={deltaStyles}
      ></Box>
      {value > previous && (
        <Box
          position='absolute'
          top='0px'
          bottom='0px'
          background={'white'}
          zIndex={1}
          width={`${percent}%`}
        ></Box>
      )}
      <Box
        position='absolute'
        top='0px'
        bottom='0px'
        background={background}
        zIndex={2}
        style={barStyles}
      ></Box>
      <Box
        position='absolute'
        top='0px'
        bottom='0px'
        left='0px'
        right='0px'
        alignItems='flex-end'
        justifyContent='center'
        color='rgba(255,255,255,0.81)'
        padding='0px 2px'
        zIndex={3}
        style={{
          textShadow: '0px 1px 1px rgba(0,0,0,1)',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
