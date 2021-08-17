import { Character } from '../../types/character/character'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { Box } from '../_core/Box'
import { ReactComponent as Na } from '../../icons/sbed/cancel.svg'
import { ReactComponent as Dead } from '../../icons/lorc/tombstone.svg'
import { Icon } from '../_core/Icon'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { Spacer } from '../_core/Spacer'
import { Bar } from '../_core/Bar'
import { min } from '../../types/equation'
import { theme } from '../../theme'

export type CombatPartyBenchProps = {
  partyId: string
}

export const CombatPartyBench = (props: CombatPartyBenchProps) => {
  const { partyId } = props
  const { getBenchCharacters } = useCombatSystem()
  const bench = getBenchCharacters(partyId)
  const benchList = Array(5)
    .fill(undefined)
    .map((_, i) => bench[i])

  return (
    <Box
      flex='1'
      padding='16px 8px 8px 8px'
      // background='rgba(0, 0, 0, 0.45)'
      color='white'
    >
      <Box flexDirection='row' justifyContent='space-around' width='426px'>
        {benchList.map((character) => (
          <Box>
            <CombatPartyBenchCharacter character={character} />
          </Box>
        ))}
      </Box>
      <Box flexDirection='row' alignItems='center' paddingTop='8px'>
        <Spacer />
        <Box
          style={{
            //fontFamily: 'Trade Winds',
            textTransform: 'uppercase',
            fontWeight: 900,
            fontSize: '12px',
            textShadow: '0px 3px 3px rgba(0,0,0,0.9)',
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
  const stats = getCharacterStats(character?.id || '')
  const currentHealth = min(stats.health - (character?.damage || 0), 0)
  return (
    <CombatCharacterAvatar
      character={character}
      borderColor={
        character ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.09)'
      }
      borderWidth={character ? 2 : 1}
      width='64px'
      height='64px'
      display='flex'
      opacity={character && stats.healthRatio <= 0 ? '0.45' : '1'}
      style={{ display: 'flex' }}
    >
      <Box justifyContent='center' alignItems='center' flex={1}>
        {!character && (
          <Icon color='rgba(255,255,255,0.18)' width='32px'>
            <Na />
          </Icon>
        )}
        {character && stats.healthRatio <= 0 && (
          <Box
            color='white'
            style={{
              fontFamily: 'Trade Winds',
              textShadow: '0px 0px 3px rgba(0,0,0,1)',
            }}
          >
            Dead
          </Box>
        )}
      </Box>
      {character && (
        <Box
          flexDirection='row'
          width='100%'
          borderTop='2px solid rgba(255,255,255,0.9)'
        >
          {stats && (
            <Bar
              width='100%'
              value={currentHealth}
              max={stats.health}
              height='6px'
              background={theme.healthBarRed}
              border='1px solid rgba(0,0,0,0.45)'
              color='rgba(0,0,0,0.56)'
              style={{
                fontSize: '12px',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
      )}
    </CombatCharacterAvatar>
  )
}
