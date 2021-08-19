import styled from 'styled-components'
import { theme } from '../../../theme'
import { Box, NumberBox } from '../Box'

export const Wrapper = styled(Box)({
  marginLeft: '0x',
  flexDirection: 'row',
  alignItems: 'center',
})

export const StatusWrapper = styled(Box)<{ isPositive: boolean }>((props) => ({
  color: !props.isPositive ? theme.statsPink : theme.statsGreen,
  marginRight: '4px',
  flexDirection: 'row',
  alignItems: 'center',
}))

export const StatusChance = styled(NumberBox)({
  marginRight: '2px',
  opacity: 0.72,
  fontSize: '10px',
  fontWeight: 300,
})

export const StatusName = styled(Box)<{ isHovering?: boolean }>((props) => ({
  fontSize: '13px',
  fontWeight: 400,
  cursor: 'default',
  textDecoration: props.isHovering ? 'underline' : 'none',
}))
