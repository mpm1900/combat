import { Ability, AbilityStatus } from '../../../types/ability/ability'
import { Box } from '../Box'
import { Spacer } from '../Spacer'
import { StatusList } from '../StatusList'
import { TooltipCard } from '../TooltipCard'

export type AbilityCardProps = {
  ability: Ability
}

export const AbilityCard = (props: AbilityCardProps) => {
  const { ability } = props
  const normalStatuses = ability.statuses.filter(
    (s) => s.conditions.length === 0,
  )
  const criticalStatuses = ability.statuses.filter(
    (s) => s.conditions.length > 0,
  )
  return (
    <TooltipCard>
      <Box style={{ fontFamily: 'Trade Winds' }}>{ability.name}</Box>
      {normalStatuses.length > 0 && (
        <Box marginTop='4px'>
          <Box flexDirection='row'>
            <Box
              color='white'
              style={{
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
              }}
            >
              Statuses
            </Box>
            <Spacer />
          </Box>
          <StatusList
            type='source'
            statuses={normalStatuses}
            showIcon={false}
          />
        </Box>
      )}
      {criticalStatuses.length > 0 && (
        <Box marginTop='4px'>
          <Box flexDirection='row'>
            <Box
              color='white'
              style={{
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
              }}
            >
              Critical Statuses
            </Box>
            <Spacer margin='auto 0px' />
          </Box>
          <StatusList
            type='source'
            statuses={criticalStatuses}
            showIcon={false}
          />
        </Box>
      )}
      {ability.immunities.length > 0 && (
        <Box marginTop='4px'>
          <Box
            style={{
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'uppercase',
            }}
          >
            Immunities
          </Box>
          <Box flexDirection='row'>
            <StatusList
              statuses={ability.immunities}
              showIcon={false}
              type='source'
            />
          </Box>
        </Box>
      )}
    </TooltipCard>
  )
}
