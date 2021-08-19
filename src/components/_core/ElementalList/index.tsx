import { PropsWithChildren, useState } from 'react'
import { Elemental } from '../../../types/elemental'
import { Box, BoxProps } from '../Box'
import { ElementalCard } from '../ElementalCard'
import { ElementalIcon } from '../ElementalIcon'
import { Tooltip } from '../Tooltip'

export type ElementalListProps = BoxProps & {
  elements: Elemental[]
}

export const ElementalList = (props: ElementalListProps) => {
  const { elements, ...rest } = props
  return (
    <Box {...rest}>
      {elements.map((e) => (
        <ElementalListItem element={e}>
          <ElementalIcon height='24px' width='24px' type={e.element} />
        </ElementalListItem>
      ))}
    </Box>
  )
}

export const ElementalListItem = (
  props: PropsWithChildren<{ element: Elemental }>,
) => {
  const { element, children } = props
  const [isHovering, setIsHovering] = useState(false)
  return (
    <Box
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip
        isOpen={isHovering}
        content={<ElementalCard element={element} />}
        options={{
          auto: true,
          placement: 'bottom-center',
          triggerOffset: 4,
        }}
      >
        {children}
      </Tooltip>
    </Box>
  )
}
