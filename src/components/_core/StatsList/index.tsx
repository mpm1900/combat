import { theme } from '../../../theme'
import {
  CharacterStats,
  ResolvedCharacterStats,
} from '../../../types/character/character'
import { ZERO_STATS } from '../../../types/character/data/ZERO_STATS'
import { ElementalType } from '../../../types/elemental'
import { Modifier, reduceModifiers } from '../../../types/stats'
import { Box, BoxProps } from '../Box'
import { colorMap } from '../ElementalIcon'
import { Spacer } from '../Spacer'
import { statKeyMap } from '../StatusCard'

const getColorKey = (key: string): ElementalType => {
  return key
    .replace('Accuracy', '')
    .replace('Damage', '')
    .replace('Resistance', '') as ElementalType
}

export type StatsListProps = BoxProps & {
  modifiers: Modifier[]
  lineProps?: BoxProps
  spacer?: boolean
  separator?: (i: number, count: number) => JSX.Element | string
}

export const StatsList = (props: StatsListProps) => {
  const {
    modifiers,
    lineProps = {},
    spacer = false,
    separator = () => '',
    ...rest
  } = props
  const mod = reduceModifiers(modifiers)
  const { stats } = mod
  const nonZeroStatKeys = (Object.keys(stats) as (keyof CharacterStats)[])
    .filter((key) => {
      const eqo = stats[key]
      return eqo.m !== 0 || eqo.b !== 0
    })
    .sort((a, b) => {
      return a.localeCompare(b)
    })
  const m = (key: keyof CharacterStats) => stats[key].m
  const b = (key: keyof CharacterStats) => stats[key].b
  const getValueColor = (value: number) => {
    return value > 0 ? 'lightgreen' : value < 0 ? 'lightcoral' : 'white'
  }
  return (
    <Box {...rest}>
      {nonZeroStatKeys.map((key, i) => (
        <Box
          key={key}
          flexDirection='row'
          justifyContent='space-between'
          {...lineProps}
        >
          <Box
            marginRight='4px'
            color={
              key.includes('special')
                ? theme.specialTextColor
                : key.includes('physical')
                ? theme.physicalTextColor
                : colorMap[getColorKey(key)] || 'rgba(255,255,255,0.72)'
            }
            style={{ fontSize: '14px' }}
          >
            {statKeyMap[key] || key}
          </Box>
          {spacer && <Spacer />}
          {m(key) !== 0 && (
            <Box
              color={getValueColor(m(key))}
              style={{
                fontFamily: 'Roboto Mono',
                fontSize: '13px',
              }}
            >
              {m(key) > 0 ? '+' : ''}
              {m(key) * 100}%
            </Box>
          )}
          {b(key) !== 0 && m(key) !== 0 && (
            <Box
              style={{
                fontFamily: 'Roboto Mono',
                fontSize: '13px',
              }}
            >
              ,
            </Box>
          )}
          {b(key) !== 0 && (
            <Box
              color={getValueColor(b(key))}
              style={{
                fontFamily: 'Roboto Mono',
                fontSize: '13px',
              }}
            >
              {b(key) > 0 ? '+' : ''}
              {b(key)}
            </Box>
          )}
          {separator(i, nonZeroStatKeys.length)}
        </Box>
      ))}
    </Box>
  )
}
