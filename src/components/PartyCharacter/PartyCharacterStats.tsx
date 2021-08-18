import { PartyCharacterProps } from '.'
import { theme } from '../../theme'
import {
  CharacterModifierDisplayKeys,
  CharacterStats,
} from '../../types/character/character'
import { convertStats, getStatsAndModifier } from '../../types/character/util'
import { ElementalType } from '../../types/elemental'
import { Box } from '../_core/Box'
import { colorMap } from '../_core/ElementalIcon'
import { Spacer } from '../_core/Spacer'
import { statKeyMap } from '../_core/StatusCard'

export const PartyCharacterStats = (props: PartyCharacterProps) => {
  const { character } = props
  const [stats, { stats: mods }] = getStatsAndModifier(character)
  const nonZeroStatKeys = (
    Object.keys(stats) as (keyof CharacterStats)[]
  ).filter((key) => (key as string) !== 'healthRatio' && stats[key] > 0)
  const otherNonZeroModKeys = CharacterModifierDisplayKeys.filter((key) => {
    if (nonZeroStatKeys.includes(key)) return false
    const mod = mods[key]
    return !!mod?.m || !!mod?.b
  })
  const getColorKey = (key: string) => {
    return key
      .replace('Accuracy', '')
      .replace('Damage', '')
      .replace('Resistance', '')
  }
  const convertedStats = convertStats(character)
  return (
    <Box width='240px' flexDirection='column'>
      <Box flex='1' marginRight='0px'>
        {nonZeroStatKeys.map((key) => (
          <Box key={key} flexDirection='row'>
            <Box
              color={
                key.includes('special')
                  ? theme.specialTextColor
                  : key.includes('physical')
                  ? theme.physicalTextColor
                  : 'white'
              }
            >
              {statKeyMap[key] || key}
            </Box>
            <Spacer />
            <Box
              color={
                stats[key] > convertedStats[key]
                  ? 'lightgreen'
                  : stats[key] < convertedStats[key]
                  ? 'lightcoral'
                  : 'white'
              }
            >
              {stats[key]}
            </Box>
          </Box>
        ))}
      </Box>
      <Box flex='1' marginLeft='0px'>
        {otherNonZeroModKeys.map((key) => (
          <Box key={key} flexDirection='row' justifyContent='space-between'>
            <Box color={colorMap[getColorKey(key) as ElementalType]}>
              {statKeyMap[key] || key}
            </Box>
            <Spacer />
            <Box>
              <PartyCharacterStatValue m={mods[key]?.m} b={mods[key]?.b} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const PartyCharacterStatValue = (props: {
  m: number | undefined
  b: number | undefined
}) => {
  const { m = 0, b = 0 } = props
  if (m === 0 && b === 0) return null
  return (
    <>
      {m !== 0 && (
        <Box
          style={{
            color: m >= 1 ? 'lightblue' : m >= 0 ? 'lightgreen' : 'lightcoral',
          }}
        >
          {m > 0 ? '+' : ''}
          {m * 100}%
        </Box>
      )}
      {b !== 0 && (
        <Box>
          {b > 0 ? '+' : ''}
          {b}
        </Box>
      )}
    </>
  )
}
