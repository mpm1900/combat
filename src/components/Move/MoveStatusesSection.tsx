import styled from 'styled-components'
import { Box } from '../_core/Box'
import { Icon } from '../_core/Icon'
import { ReactComponent as Check } from '../../icons/delapouite/dice-target.svg'
import { MoveStatuses } from '../../types/move'
import { StatusList } from '../_core/StatusList'

const Section = styled(Box)({
  width: '100%',
  marginBottom: '6px',
})
const TitleWrapper = styled(Box)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})
const Title = styled(Box)({
  fontWeight: 900,
  color: 'rgba(255,255,255,0.90)',
  textTransform: 'uppercase',
  fontSize: '13px',
})
const Spacer = styled(Box)({
  flex: 1,
  height: '0px',
  borderBottom: '1px solid rgba(255,255,255,0.24)',
  margin: 'auto 8px',
})
const Chance = styled(Box)({
  fontSize: '14px',
  opacity: 0.56,
})

export type MoveStatusesSectionProps = {
  checks: number
  checksColor?: string
  chance?: number
  title: string
  statuses?: MoveStatuses
}

export const MoveStatusesSection = (props: MoveStatusesSectionProps) => {
  const { checks, checksColor = 'white', chance, statuses, title } = props
  const checksArray = Array(checks).fill(null)
  return (
    <Section>
      <TitleWrapper>
        <Title>{title}</Title>
        <Spacer />
        <Box flexDirection='row' alignItems='center'>
          <Box flexDirection='row' marginRight='4px'>
            {checksArray.map((_, i) => (
              <Icon key={i} color={checksColor} height='16px' width='16px'>
                <Check />
              </Icon>
            ))}
          </Box>

          {chance !== undefined && (
            <Chance>({(chance * 100).toFixed(0)}%)</Chance>
          )}
        </Box>
      </TitleWrapper>
      <StatusList statuses={statuses?.source} type='source' />
      <StatusList statuses={statuses?.target} type='target' />
    </Section>
  )
}
