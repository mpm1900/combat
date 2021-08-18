import styled from 'styled-components'
import { theme } from '../../../theme'

export const Table = styled.table({
  borderCollapse: 'collapse',
})

export const Tr = styled.tr({
  borderBottom: `1px solid ${theme.white2}`,
})

export const Th = styled.th({
  background: 'rgba(0,0,0,0.27)',
  color: theme.white8,
  fontWeight: 400,
  textTransform: 'uppercase',
  fontSize: '12px',
  padding: '4px',
})

export const Td = styled.td({
  padding: '4px',
  whiteSpace: 'nowrap',
})
