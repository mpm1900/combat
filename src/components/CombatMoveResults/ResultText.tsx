import { PropsWithChildren } from 'react'
import { useSpring } from 'react-spring'
import styled from 'styled-components'
import { Box } from '../_core/Box'

export type ResultTextProps = {
  perfect: boolean
  miss: boolean
  resultsDone: boolean
  perfectTextColor: string
}

const Text = styled(Box)({
  fontWeight: 700,
  fontSize: '48px',
})

export const ResultText = (props: PropsWithChildren<ResultTextProps>) => {
  const { perfect, miss, resultsDone, perfectTextColor, children } = props
  const perfectStyles = useSpring({
    from: {
      textShadow: '0px 0px 40px rgba(255,255,255,1)',
    },
    to: {
      textShadow: resultsDone
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
      {perfect && resultsDone && (
        <Text color={perfectTextColor} style={perfectStyles}>
          {children}
        </Text>
      )}
      {miss && <Text color='rgba(255,255,255,0.54)'>FAILURE</Text>}
    </Box>
  )
}
