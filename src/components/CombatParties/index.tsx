import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { CombatCharacter } from '../CombatCharacter'
import { Box } from '../_core/Box'
import { CombatPartyBench } from './CombatPartyBench'

export type CombatPartyProps = {
  index: number
  side: 'right' | 'left'
}

export const CombatParty = (props: CombatPartyProps) => {
  const { index, side } = props
  const { partyIds, getActiveCharacters } = useCombatSystem()
  const partyId = partyIds[index]
  if (!partyId) return null
  return (
    <Box>
      <Box flexDirection='row'>
        <CombatPartyBench partyId={partyId} />
      </Box>
      <Box padding='0 8px'>
        {partyId &&
          getActiveCharacters(partyId).map((c) => (
            <CombatCharacter key={c.id} character={c} side={side} />
          ))}
      </Box>
    </Box>
  )
}
