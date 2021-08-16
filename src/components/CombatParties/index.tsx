import { config, useTransition } from 'react-spring'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { CombatSystemCharacter } from '../../contexts/CombatSystemContext/types'
import { CombatCharacter } from '../CombatCharacter'
import { Box } from '../_core/Box'
import { CombatPartyBench } from './CombatPartyBench'

const height = 180

export type CombatPartyProps = {
  index: number
  side: 'right' | 'left'
}

export const CombatParty = (props: CombatPartyProps) => {
  const { index, side } = props
  const { partyIds, getActiveCharacters } = useCombatSystem()
  const partyId = partyIds[index]
  const characters = getActiveCharacters(partyId)
  const transitions = useTransition(characters, {
    key: (c: CombatSystemCharacter) => c.id,
    from: { opacity: 0, height: 0 },
    leave: { opacity: 0, height: 0 },
    enter: { opacity: 1, height },
    config: config.slow,
  })
  if (!partyId) return null
  return (
    <Box>
      <Box flexDirection='row'>
        <CombatPartyBench partyId={partyId} />
      </Box>
      <Box padding='0 32px'>
        {transitions((styles, c) => (
          <Box style={styles}>
            <CombatCharacter key={c.id} character={c} side={side} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
