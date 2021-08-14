import { Ability, AbilityStatus } from '../../../types/ability/ability'
import { Box } from '../Box'
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
        <Box marginTop='4px' background='rgba(0,0,0,0.72)' padding='4px'>
          <Box color='white' style={{ fontWeight: 700, fontSize: '14px' }}>
            Statuses
          </Box>
          <StatusList
            type='source'
            statuses={normalStatuses}
            showIcon={false}
          />
        </Box>
      )}
      {criticalStatuses.length > 0 && (
        <Box marginTop='4px' background='rgba(0,0,0,0.72)' padding='4px'>
          <Box color='white' style={{ fontWeight: 700, fontSize: '14px' }}>
            Critical Statuses
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
          <Box style={{ fontWeight: 700, fontSize: '14px' }}>Immunities</Box>
          {ability.immunities.map((immunity) => (
            <Box style={{ fontSize: '14px' }}>{immunity.name}</Box>
          ))}
        </Box>
      )}
    </TooltipCard>
  )
}
