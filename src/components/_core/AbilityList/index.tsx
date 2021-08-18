import { PropsWithChildren, useState } from 'react'
import { Box } from '../Box'
import { Tooltip } from '../Tooltip'
import { AbilityName, AbilityWrapper, Wrapper } from './style'
import { Ability } from '../../../types/ability/ability'
import { AbilityCard } from '../AbilityCard'

export type AbilityListProps = {
  abilities: Ability[] | undefined
}
export const AbilityList = (props: AbilityListProps) => {
  const { abilities = [] } = props
  return (
    <>
      {abilities.length > 0 && (
        <Wrapper>
          <Box flexDirection='row' flexWrap='wrap'>
            {abilities.map((ability, i) => (
              <AbilityListItem ability={ability}>
                {i !== abilities.length - 1 ? ',' : ''}
              </AbilityListItem>
            ))}
          </Box>
        </Wrapper>
      )}
    </>
  )
}

export type AbilityListItemProps = {
  ability: Ability
}
export const AbilityListItem = (
  props: PropsWithChildren<AbilityListItemProps>,
) => {
  const { ability, children } = props
  const [isHovering, setIsHovering] = useState(false)
  return (
    <AbilityWrapper
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip
        isOpen={isHovering}
        content={<AbilityCard ability={ability} />}
        options={{
          auto: true,
          placement: 'bottom-center',
          triggerOffset: 4,
        }}
      >
        <AbilityName isHovering={isHovering}>{ability.name}</AbilityName>
      </Tooltip>
      {children}
    </AbilityWrapper>
  )
}
