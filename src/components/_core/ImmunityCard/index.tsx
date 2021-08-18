import { Box } from '../Box'
import { StatusCardProps } from '../StatusCard'
import { TooltipCard } from '../TooltipCard'

export const ImmunityCard = (props: StatusCardProps) => {
  const { status } = props

  return (
    <TooltipCard>
      <Box style={{ fontFamily: 'Trade Winds' }}>{status.name} Immunity</Box>
    </TooltipCard>
  )
}
