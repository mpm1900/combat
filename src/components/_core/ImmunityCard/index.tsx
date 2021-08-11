import { Box } from '../Box'
import { StatusCardProps } from '../StatusCard'

export const ImmunityCard = (props: StatusCardProps) => {
  const { status } = props

  return (
    <Box background='white' padding='8px' maxWidth='200px'>
      <Box style={{ fontWeight: 700 }}>{status.name} Immunity</Box>
    </Box>
  )
}
