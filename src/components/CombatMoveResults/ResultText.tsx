import Color from 'color'
import { PropsWithChildren } from 'react'
import { useSpring } from 'react-spring'
import { Box } from '../_core/Box'

export type ResultTextProps = {
  perfect: boolean
  miss: boolean
  damageDone: boolean
  perfectTextColor: string
}

export const ResultText = (props: PropsWithChildren<ResultTextProps>) => {
  const { perfect, miss, damageDone, perfectTextColor, children } = props
  const perfectStyles = useSpring({
    from: {
      textShadow: '0px 0px 40px rgba(255,255,255,1)',
    },
    to: {
      textShadow: damageDone
        ? '0px 4px 10px rgba(0,0,0,1)'
        : '0px 0px 40px rgba(255,255,255,1)',
    },
    config: {
      mass: 5,
      tension: 2600,
      friction: 1000,
      clamp: true,
    },
  })

  return (
    <Box
      position='absolute'
      top='0'
      bottom='0'
      left='0'
      right='0'
      display='flex'
      justifyContent='center'
      alignItems='center'
      style={{
        fontFamily: 'Trade Winds',
      }}
    >
      {perfect && damageDone && (
        <Box
          style={{
            ...perfectStyles,
            fontWeight: 'bolder',
            fontSize: '48px',
            color: perfectTextColor,
          }}
        >
          {children}
        </Box>
      )}
      {miss && (
        <Box
          style={{
            fontWeight: 'bolder',
            fontSize: '48px',
            color: '#ccc',
          }}
        >
          FAILURE
        </Box>
      )}
    </Box>
  )
}
