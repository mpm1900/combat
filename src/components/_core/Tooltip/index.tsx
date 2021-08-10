import { useState } from 'react'
import { useHover, useLayer, Arrow, UseLayerOptions } from 'react-laag'
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
            <Arrow {...arrowProps} />
          </Box>,
        )}
    </>
  )
}
