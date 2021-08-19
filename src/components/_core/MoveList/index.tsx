import { PropsWithChildren, useState } from 'react'
import { Box } from '../Box'
import { Tooltip } from '../Tooltip'
import { MoveName, MoveWrapper, Wrapper } from './style'
import { Ability } from '../../../types/ability/ability'
import { AbilityCard } from '../AbilityCard'
import { Move as MoveType } from '../../../types/move'
import { Move } from '../Move'

export type MoveListProps = {
  moves: MoveType[] | undefined
}
export const MoveList = (props: MoveListProps) => {
  const { moves = [] } = props
  return (
    <>
      {moves.length > 0 && (
        <Wrapper>
          <Box flexDirection='row' flexWrap='wrap'>
            {moves.map((move, i) => (
              <MoveListItem move={move}>
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
}
export const MoveListItem = (props: PropsWithChildren<MoveListItemProps>) => {
  const { move, children } = props
  const [isHovering, setIsHovering] = useState(false)
  return (
    <MoveWrapper
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tooltip
        isOpen={isHovering}
        content={<Move move={move} />}
        options={{
          auto: true,
          placement: 'bottom-center',
          triggerOffset: 4,
        }}
      >
        <MoveName isHovering={isHovering}>{move.name}</MoveName>
      </Tooltip>
      {children}
    </MoveWrapper>
  )
}
