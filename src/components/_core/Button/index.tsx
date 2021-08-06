import styled from 'styled-components'
import { Box, BoxProps } from '../Box'

const inactiveColor = 'rgba(255,255,255,0.45)'
const activeColor = 'rgba(255,255,255,0.96)'
const StyledButton = styled(Box)({
  alignItems: 'center',
  background: 'rgba(0,0,0,0.18)',
  border: `2px solid ${inactiveColor}`,
  borderRadius: '4px',
  color: activeColor,
  cursor: 'pointer',
  fontWeight: 500,
  padding: '4px 16px',
  textTransform: 'uppercase',
  textShadow: '0px 1px 3px rgba(0,0,0,0.54)',
  ':hover': {
    background: 'rgba(255,255,255,0.18)',
    borderColor: activeColor,
    color: activeColor,
  },
  ':active': {
    background: 'transparent',
  },
})

export const Button = (props: BoxProps) => <StyledButton {...props} />
