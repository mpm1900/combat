import styled from 'styled-components'
import { Box, BoxProps } from '../Box'

const inactiveColor = 'rgba(255,255,255,0.27)'
const activeColor = 'rgba(255,255,255,0.96)'
type ButtonProps = { isHovering?: boolean; disabled?: boolean }
const StyledButton = styled(Box)<ButtonProps>((p) => ({
  alignItems: 'center',
  background: 'rgba(0,0,0,0.18)',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: inactiveColor,
  borderRadius: '4px',
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

const StyledCriticalButton = styled(StyledButton)((p) => ({
  background: 'rgba(240,128,128,0.09)',
  borderColor: 'rgba(240,128,128,0.36)',
  ':hover': {
    background: 'rgba(255,128,128,0.27)',
    borderColor: 'rgba(240,128,128,0.45)',
    color: activeColor,
  },
}))

export const Button = (props: BoxProps & ButtonProps) => (
  <StyledButton as='button' {...props} />
)

export const CriticalButton = (props: BoxProps & ButtonProps) => (
  <StyledCriticalButton as='button' {...props} />
)

CriticalButton.defaultProps = {
  padding: '4px 16px',
  borderRadius: '4px',
}

Button.defaultProps = {
  padding: '4px 16px',
  borderRadius: '4px',
}
