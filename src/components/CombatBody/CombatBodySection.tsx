import { ReactNode } from 'react'
import { Box, BoxProps } from '../_core/Box'

export type CombatBodySectionProps = BoxProps & {
  title: ReactNode
}

export const CombatBodySection = (props: CombatBodySectionProps) => {
  const { title, children, ...rest } = props
  return (
    <Box flex='1' overflow='hidden' {...rest}>
      <Box
        alignItems='center'
        color='white'
        flexDirection='row'
        marginBottom='24px'
        justifyContent='center'
        textAlign='center'
        style={{ fontSize: '24px', fontWeight: 400, fontFamily: 'Trade Winds' }}
      >
        {title}
      </Box>
      {children}
    </Box>
  )
}
