import styled from 'styled-components'
import { Box, BoxProps } from '../Box'

const inactiveColor = 'rgba(255,255,255,0.27)'
const activeColor = 'rgba(255,255,255,0.96)'
type ButtonProps = { isHovering?: boolean; disabled?: boolean }
const StyledButton = styled(Box)<ButtonProps>((p) => ({
  alignItems: 'center',
  background: 'rgba(0,0,0,0.18)',
  border: `2px solid ${inactiveColor}`,
  color: activeColor,
  cursor: 'pointer',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  textShadow: '0px 1px 3px rgba(0,0,0,0.54)',
  fontFamily: 'Trade Winds',
  ':hover': {
    background: 'rgba(255,255,255,0.18)',
    borderColor: activeColor,
    color: activeColor,
  },
  ':active': {
    background: 'transparent',
  },
  ':disabled': {
    opacity: 0.36,
    background: 'rgba(255,255,255,0.09)',
    cursor: 'not-allowed',
  },
  ...(p.isHovering
    ? {
        opacity: 1,
        background: 'rgba(255,255,255,0.18)',
        borderColor: activeColor,
        color: activeColor,
      }
    : {}),
}))

export const Button = (props: BoxProps & ButtonProps) => (
  <StyledButton as='button' {...props} />
)

Button.defaultProps = {
  padding: '4px 16px',
  borderRadius: '4px',
}
