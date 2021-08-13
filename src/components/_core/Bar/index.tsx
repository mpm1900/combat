import { useEffect } from 'react'
import { useSpring } from 'react-spring'
import { usePrevious } from '../../../hooks/usePrevious'
import { AnimatedNumberValue } from '../AnimatedNumber'
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
  const diff = previous - value

  const barSpeed = previous > value ? 0 : (diff + 50) * 10
  const barStyles = useSpring({
    width: `${percent}%`,
    config: {
      duration: barSpeed,
    },
  })

  const deltaSpeed = previous <= value ? 0 : (diff + 50) * 10
  const deltaStyles = useSpring({
    width: `${percent}%`,
    config: {
      duration: deltaSpeed,
    },
  })

  return (
    <Box {...rest} position='relative' background='rgba(0,0,0,0.54)' zIndex={1}>
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
        alignItems='center'
        justifyContent='flex-end'
        color='rgba(255,255,255,0.81)'
        flexDirection='row'
        padding='0px 2px'
        zIndex={3}
        style={{
          textShadow: '0px 1px 1px rgba(0,0,0,1)',
        }}
      >
        {children || (
          <span>
            <AnimatedNumberValue>{value}</AnimatedNumberValue>/{max}
          </span>
        )}
      </Box>
    </Box>
  )
}
