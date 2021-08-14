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
      <Box style={{ fontWeight: 700 }}>{ability.name}</Box>
      {normalStatuses.length > 0 && (
        <Box marginTop='4px' background='rgba(0,0,0,0.27)' padding='8px'>
          <Box flexDirection='row'>
            <Box
              color='white'
              style={{
                fontWeight: 700,
                fontSize: '14px',
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
            //showIcon={false}
          />
        </Box>
      )}
      {criticalStatuses.length > 0 && (
        <Box marginTop='4px' background='rgba(0,0,0,0.27)' padding='8px'>
          <Box flexDirection='row'>
            <Box
              color='white'
              style={{
                fontWeight: 700,
                fontSize: '14px',
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
            //showIcon={false}
          />
        </Box>
      )}
      {ability.immunities.length > 0 && (
        <Box marginTop='4px' background='rgba(0,0,0,0.27)' padding='8px'>
          <Box
            style={{
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'uppercase',
            }}
          >
            Immunities
          </Box>
          {ability.immunities.map((immunity) => (
            <Box style={{ fontSize: '14px' }}>{immunity.name}</Box>
          ))}
        </Box>
      )}
    </TooltipCard>
  )
}
