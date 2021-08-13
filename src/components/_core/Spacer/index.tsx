import styled from 'styled-components'
import { Box } from '../Box'

export const Spacer = styled(Box)({
  flex: 1,
  height: '0px',
})

Spacer.defaultProps = {
  margin: 'auto 16px',
  borderBottom: '1px solid rgba(255,255,255,0.24)',
}
