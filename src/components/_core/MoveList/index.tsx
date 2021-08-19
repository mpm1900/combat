import { PropsWithChildren, useState } from 'react'
import { Box } from '../Box'
import { Tooltip } from '../Tooltip'
import { MoveName, MoveWrapper, Wrapper } from './style'
import { Ability } from '../../../types/ability/ability'
import { AbilityCard } from '../AbilityCard'
import { Move as MoveType } from '../../../types/move'
import { Move } from '../Move'
import { colorMap } from '../ElementalIcon'
import { Character } from '../../../types/character/character'

export type MoveListProps = {
  moves: MoveType[] | undefined
  character?: Character
}
export const MoveList = (props: MoveListProps) => {
  const { moves = [], character } = props
  return (
    <>
      {moves.length > 0 && (
        <Wrapper>
          <Box flexDirection='row' flexWrap='wrap'>
            {moves.map((move, i) => (
              <MoveListItem move={move} character={character}>
                {i !== moves.length - 1 ? ',' : ''}
              </MoveListItem>
            ))}
          </Box>
        </Wrapper>
      )}
    </>
  )
}

export type MoveListItemProps = {
  move: MoveType
  character?: Character
}
export const MoveListItem = (props: PropsWithChildren<MoveListItemProps>) => {
  const { move, character, children } = props
  const [isHovering, setIsHovering] = useState(false)
  return (
    <MoveWrapper
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip
        isOpen={isHovering}
        content={<Move move={move} character={character} />}
        options={{
          auto: true,
          placement: 'bottom-center',
          triggerOffset: 4,
        }}
      >
        <MoveName isHovering={isHovering} color={colorMap[move.element]}>
          {move.name}
        </MoveName>
      </Tooltip>
      {children}
    </MoveWrapper>
  )
}
