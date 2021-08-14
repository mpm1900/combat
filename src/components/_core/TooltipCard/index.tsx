import styled from 'styled-components'
import { theme } from '../../../theme'
import { Box } from '../Box'

export const TooltipCard = styled(Box)({
  background: theme.boxGradient,
  border: '1px solid rgba(255,255,255,0.54)',
  padding: '8px',
  maxWidth: '200px',
  color: 'white',
})
