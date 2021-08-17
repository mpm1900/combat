import styled from 'styled-components'
import { Character } from '../../types/character/character'
import { ElementalType } from '../../types/elemental'
import { Box, BoxProps } from '../_core/Box'
import { colorMap } from '../_core/ElementalIcon'

const Wrapper = styled(Box)((p) => ({
  boxShadow: '0px 0px 10px inset rgba(0,0,0,0.45)',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'inline-block',
  color: 'black',
  lineHeight: `calc(${p.height} - 8px)`,
  fontWeight: 900,
}))

export type CombatCharacterAvatarProps = BoxProps & {
  character: Character | undefined
}
export const CombatCharacterAvatar = (props: CombatCharacterAvatarProps) => {
  const { character, children, ...rest } = props
  return (
    <Wrapper
      {...rest}
      backgroundColor={
        colorMap[character?.elements[0].element as ElementalType] ||
        'rgba(0,0,0,0.27)'
      }
    >
      {children}
    </Wrapper>
  )
}

CombatCharacterAvatar.defaultProps = {
  height: '60px',
  width: '60px',
  borderWidth: '2px',
  borderColor: 'white',
  borderStyle: 'solid',
  alignItems: 'center',
  justifyContent: 'center',
}
