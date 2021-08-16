import { PropsWithChildren } from 'react'
import { config, useSpring, useTransition } from 'react-spring'
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
  const { partyIds, activeCharacter, getActiveCharacters } = useCombatSystem()
  const partyId = partyIds[index]
  const characters = getActiveCharacters(partyId)
  const isActive = (id: string) => id === activeCharacter?.id
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
      <Box padding={side === 'left' ? '0 48px 0 16px' : '0 16px 0 48px'}>
        {transitions((styles, c) => (
          <Box style={styles}>
            <CombatPartyActiveCharacter id={c.id} side={side}>
              <CombatCharacter key={c.id} character={c} side={side} />
            </CombatPartyActiveCharacter>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const CombatPartyActiveCharacter = (
  props: PropsWithChildren<{ id: string; side: 'right' | 'left' }>,
) => {
  const { id, side, children } = props
  const { activeCharacter } = useCombatSystem()
  const isActive = id === activeCharacter?.id
  const paddingLeft = () => {
    if (isActive) {
      if (side === 'left') return 32
      return 0
    } else {
      if (side === 'right') return 32
      return 0
    }
  }
  const paddingRight = () => {
    if (isActive) {
      if (side === 'right') return 32
      return 0
    } else {
      if (side === 'left') return 32
      return 0
    }
  }
  const styles = useSpring({
    paddingLeft: paddingLeft(),
    paddingRight: paddingRight(),
  })
  return <Box style={styles}>{children}</Box>
}
