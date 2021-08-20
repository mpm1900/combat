import { ReactChild, ReactNode } from 'react'
import { Box, BoxProps } from '../_core/Box'

export type CombatBodySectionProps = BoxProps & {
  title: ReactChild | Element
}

export const CombatBodySection = (props: CombatBodySectionProps) => {
  const { title, children, ...rest } = props
  return (
    <Box flex='1' overflow='hidden' {...rest}>
      <Box
        padding='24px 0'
        alignItems='center'
        color='white'
        flexDirection='row'
        marginBottom='24px'
        justifyContent='center'
        textAlign='center'
        style={{
          fontSize: '24px',
          fontWeight: 400,
          fontFamily: 'Trade Winds',
          textShadow: '0px 3px 3px rgba(0,0,0,0.9)',
        }}
      >
        {title}
      </Box>
      {children}
    </Box>
  )
}
