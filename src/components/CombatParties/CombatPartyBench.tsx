import { Character } from '../../types/character/character'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { ReactComponent as Na } from '../../icons/sbed/cancel.svg'
import { ReactComponent as Dead } from '../../icons/lorc/tombstone.svg'
import { Icon } from '../_core/Icon'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { Spacer } from '../_core/Spacer'

export type CombatPartyBenchProps = {
  partyId: string
}

export const CombatPartyBench = (props: CombatPartyBenchProps) => {
  const { partyId } = props
  const { getBenchCharacters } = useCombatSystem()
  const bench = getBenchCharacters(partyId)
  const benchList = Array(6)
    .fill(undefined)
    .map((_, i) => bench[i])

  if (bench.length === 0) return null
  return (
    <Box
      flex='1'
      padding='0 8px 8px 8px'
      background='rgba(0, 0, 0, 0.45)'
      color='white'
    >
      <Box flexDirection='row' justifyContent='space-between'>
        {benchList.map((character) => (
          <CombatPartyBenchCharacter character={character} />
        ))}
      </Box>
      <Box flexDirection='row' alignItems='center' paddingTop='8px'>
        <Spacer />
        <Box
          style={{
            fontFamily: 'Trade Winds',
          }}
        >
          Bench
        </Box>
        <Spacer />
      </Box>
    </Box>
  )
}

export type CombatPartyBenchCharacterProps = {
  character: Character | undefined
}

export const CombatPartyBenchCharacter = (
  props: CombatPartyBenchCharacterProps,
) => {
  const { character } = props
  const { getCharacterStats } = useCombatSystem()
  const stats = character ? getCharacterStats(character.id) : undefined
  return (
    <CombatCharacterAvatar
      character={character}
      borderColor='rgba(255,255,255,0.45)'
      borderWidth={1}
      justifyContent='center'
      alignItems='center'
      width='48px'
      height='48px'
      style={{ display: 'flex' }}
    >
      {!character && (
        <Icon color='rgba(255,255,255,0.45)' width='32px'>
          <Na />
        </Icon>
      )}
      {stats && stats.healthRatio <= 0 && (
        <Icon color='black' width='32px'>
          <Dead />
        </Icon>
      )}
    </CombatCharacterAvatar>
  )
}
