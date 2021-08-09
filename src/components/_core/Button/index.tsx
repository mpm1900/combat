import styled from 'styled-components'
import { Box, BoxProps } from '../Box'

const inactiveColor = 'rgba(255,255,255,0.45)'
const activeColor = 'rgba(255,255,255,0.96)'
type ButtonProps = { isHovering?: boolean; disabled?: boolean }
const StyledButton = styled(Box)<ButtonProps>((p) => ({
  alignItems: 'center',
  background: 'rgba(0,0,0,0.18)',
  border: `2px solid ${inactiveColor}`,
  borderRadius: '4px',
  color: activeColor,
  cursor: 'pointer',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 500,
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
  ...(p.isHovering
    ? {
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
}
