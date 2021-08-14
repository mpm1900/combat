import { useLayer, Arrow, UseLayerOptions } from 'react-laag'
import { theme } from '../../../theme'
import { Box, BoxProps } from '../Box'

export type TooltipProps = BoxProps & {
  content: JSX.Element
  isOpen?: boolean
  contentProps?: Omit<BoxProps, 'children'>
  options?: Omit<UseLayerOptions, 'isOpen'>
}

export const Tooltip = (props: TooltipProps) => {
  const {
    isOpen = false,
    content,
    children,
    contentProps = {},
    options = {},
    ...rest
  } = props

  const { arrowProps, layerProps, triggerProps, renderLayer } = useLayer({
    isOpen,
    ...options,
  })

  return (
    <>
      <Box {...rest} {...triggerProps}>
        {children}
      </Box>
      {isOpen &&
        renderLayer(
          <Box {...contentProps} {...layerProps} zIndex={999}>
            {content}
            <Arrow
              {...arrowProps}
              backgroundColor={theme.boxGradientFrom}
              borderColor='rgba(255,255,255,0.54)'
              borderWidth={1}
              style={{
                ...arrowProps.style,
                marginBottom: '-1px',
                marginTop: '-1px',
                marginLeft: '-1px',
                marginRight: '-1px',
              }}
            />
          </Box>,
        )}
    </>
  )
}
