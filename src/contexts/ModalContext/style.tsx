import styled from 'styled-components'

export const ModalContextWrapper = styled.div({
  position: 'relative',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  display: 'flex',
  flex: 1,
})

export const ModalNodeWrapper = styled.div({
  position: 'absolute',
  background: 'rgba(0,0,0,0.5)',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 99999,
})
