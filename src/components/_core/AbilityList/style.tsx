import styled from 'styled-components'
import { theme } from '../../../theme'
import { Box } from '../Box'

export const Wrapper = styled(Box)({
  marginLeft: '0x',
  flexDirection: 'row',
  alignItems: 'center',
})

export const AbilityWrapper = styled(Box)((props) => ({
  marginRight: '4px',
  flexDirection: 'row',
  alignItems: 'center',
}))

export const AbilityName = styled(Box)<{ isHovering?: boolean }>((props) => ({
  fontSize: '13px',
  fontWeight: 400,
  cursor: 'default',
  textDecoration: props.isHovering ? 'underline' : 'none',
}))
