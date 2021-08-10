import styled, { CSSProperties } from 'styled-components'
import { Box, BoxProps } from '../Box'

export type HexagonProps = BoxProps & {
  size: number
  color: string
  borderWidth?: number
  borderColor?: string
}

const StyledHexagon = styled(Box)<HexagonProps>((props) => {
  const { size, borderWidth = 0 } = props
  const baseHeight = size / Math.sqrt(3)
  const sharedWidth = size / Math.sqrt(2)
  const shared: CSSProperties = {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'inherit',
    width: `${sharedWidth}px`,
    height: `${sharedWidth}px`,
    transform: `scaleY(0.5774) rotate(-45deg)`,
    left: `${0.1464466 * size - borderWidth}px`,
    borderStyle: 'inherit',
    borderColor: 'inherit',
  }
  return {
    position: 'relative',
    boxSizing: 'border-box',
    zIndex: 2,
    width: `${size}px`,
    height: `${baseHeight}px`,
    margin: `${baseHeight / 2}px`,
    backgroundColor: props.color,
    borderStyle: 'solid',
    borderColor: props.borderColor,
    borderLeftWidth: `${borderWidth}px`,
    borderRightWidth: `${borderWidth}px`,
    borderTopWidth: 0,
    borderBottomWidth: 0,

    ':before': {
      ...shared,
      boxSizing: 'border-box',
      top: `${-1 * (sharedWidth / 2)}px`,
      borderTopWidth: `${borderWidth * Math.sqrt(2)}px`,
      borderBottomWidth: 0,
      borderRightWidth: `${borderWidth * Math.sqrt(2)}px`,
      borderLeftWidth: 0,
    },
    ':after': {
      ...shared,
      boxSizing: 'border-box',
      bottom: `${-1 * (sharedWidth / 2)}px`,
      borderTop: 0,
      borderBottomWidth: `${borderWidth * Math.sqrt(2)}px`,
      borderRightWidth: 0,
      borderLeftWidth: `${borderWidth * Math.sqrt(2)}px`,
    },
  }
})

export const Hexagon = (props: HexagonProps) => <StyledHexagon {...props} />
