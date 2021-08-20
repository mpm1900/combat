import styled from 'styled-components'
import { Box, BoxProps, NumberBox } from '../Box'
import { Icon } from '../Icon'
import { ReactComponent as Check } from '../../../icons/delapouite/dice-target.svg'
import { MoveStatuses } from '../../../types/move'
import { StatusList } from '../StatusList'
import { Spacer } from '../Spacer'

const Section = styled(Box)({
  width: '100%',
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
const Chance = styled(Box)({
  fontSize: '14px',
  opacity: 0.56,
})

export type MoveStatusesSectionProps = BoxProps & {
  checks: number
  checksColor?: string
  chance?: number
  title?: string
  statuses?: MoveStatuses
  critOffset: number
}

export const MoveStatusesSection = (props: MoveStatusesSectionProps) => {
  const {
    checks,
    checksColor = 'white',
    chance,
    statuses,
    title,
    critOffset,
    ...rest
  } = props
  const checksArray = Array(checks).fill(null)
  return (
    <Section {...rest}>
      {title && (
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
      )}
      <StatusList statuses={statuses?.source} type='source' />
      <StatusList statuses={statuses?.target} type='target' />
      {critOffset > 0 && (
        <Box
          flexDirection='row'
          style={{ fontSize: '14px' }}
          color='lightgreen'
        >
          <NumberBox style={{ fontSize: '12px' }} marginRight='4px'>
            +{critOffset * 100}%
          </NumberBox>
          Critical Chance
        </Box>
      )}
    </Section>
  )
}
