import styled from 'styled-components'
import { AttackTypes } from '../../types/character/character'
import { Box } from '../_core/Box'

export const Wrapper = styled(Box)`
  color: white;
  flex-direction: column;
  padding: 12px 16px 16px 16px;
  margin: 8px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  min-width: 250px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.27);
  background: linear-gradient(
    198deg,
    rgba(45, 47, 56, 1) 0%,
    rgba(80, 94, 116, 1) 100%
  );
`
export const Header = styled(Box)({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '12px',
})

export const AttackWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  border: '1px solid black',
})

export const AttackPower = styled.div<{ type: AttackTypes }>((props) => ({
  display: 'flex',
  flex: 1,
  fontSize: '32px',
  fontWeight: 800,
  justifyContent: 'center',
  alignItems: 'center',
  background:
    props.type === 'special'
      ? 'linear-gradient(198deg, rgba(130,93,232,1) 0%, rgba(129,36,195,1) 100%)'
      : 'linear-gradient(198deg, rgba(232,148,93,1) 0%, rgba(215,93,13,1) 100%)',
  // color: props.type === 'physical' ? 'blue' : 'purple',
}))

export const AttackAccuracy = styled.div({
  display: 'flex',
  flex: 1,
  background: 'black',
  color: 'rgba(255,255,255,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
})

const accuracyColors: any = {
  1: 'DarkOrchid',
  2: 'CornflowerBlue',
  3: 'LightGreen',
  4: 'Yellow',
  5: 'Orange',
  6: 'Salmon',
}
export const AttackAccuracyText = styled.div<{ checks: number }>((props) => ({
  fontWeight: 800,
  fontSize: 32,
  color: accuracyColors[props.checks] || 'white',
}))

export const MoveDetailsTitle = styled(Box)({
  color: 'rgba(255,255,255,0.54)',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 700,
  whiteSpace: 'nowrap',
})

export const MoveDetailsValue = styled(Box)({
  color: 'white',
  fontWeight: 700,
  fontSize: '13px',
})
