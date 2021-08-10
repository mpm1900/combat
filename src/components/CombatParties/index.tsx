import { useCombat } from '../../contexts/CombatContext'
import { CombatCharacter } from '../CombatCharacter'
import { Box } from '../_core/Box'

export type CombatPartyProps = {
  index: number
  side: 'right' | 'left'
}

export const CombatParty = (props: CombatPartyProps) => {
  const { index, side } = props
  const { parties } = useCombat()
  const party = parties[index]
  return (
    <Box padding='8px'>
      {party &&
        party.characters.map((c) => (
          <CombatCharacter key={c.id} character={c} side={side} />
        ))}
    </Box>
  )
}
