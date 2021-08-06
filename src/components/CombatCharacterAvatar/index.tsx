import styled from 'styled-components'
import { overflow } from 'styled-system'
import { Character } from '../../types/character/character'
import { ElementalType } from '../../types/elemental'
import { colorMap } from '../Move/ElementIcon'
import { Box, BoxProps } from '../_core/Box'

const Wrapper = styled(Box)({
  boxShadow: '0px 0px 10px inset rgba(0,0,0,0.45)',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  textOverflow: 'ellipsis',
  display: 'inline-block',
})

export type CombatCharacterAvatarProps = BoxProps & {
  character: Character
}
export const CombatCharacterAvatar = (props: CombatCharacterAvatarProps) => {
  const { character, ...rest } = props
  return (
    <Wrapper
      {...rest}
      backgroundColor={
        colorMap[character?.elements[0].element as ElementalType]
      }
    ></Wrapper>
  )
}

CombatCharacterAvatar.defaultProps = {
  height: '60px',
  width: '60px',
  borderWidth: '2px',
  borderColor: 'white',
  borderStyle: 'solid',
}
