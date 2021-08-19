import { animated } from '@react-spring/web'
import { HTMLAttributes } from 'react'
import styled, { StyledProps } from 'styled-components'
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from 'styled-system'
type Theme = any

interface StyledBoxProps
  extends ColorProps<Theme>,
    BackgroundProps<Theme>,
    BorderProps<Theme>,
    FlexboxProps<Theme>,
    PositionProps,
    LayoutProps<Theme>,
    SpaceProps<Theme>,
    TextAlignProps,
    Partial<Pick<StyledProps<any>, 'style'>> {}

const StyledBox = styled(animated.div)<StyledBoxProps>(
  background,
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  textAlign,
)

export type BoxProps = HTMLAttributes<any> & StyledBoxProps
export const Box = StyledBox

Box.displayName = 'Box'
Box.defaultProps = {
  display: 'flex',
  flexDirection: 'column',
}

export const NumberBox = (props: BoxProps) => (
  <Box
    {...props}
    style={{
      fontFamily: 'Roboto Mono',
      fontSize: '14px',
      ...(props.style || {}),
    }}
  />
)
