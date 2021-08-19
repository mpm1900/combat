import { PartyCharacterProps } from '.'
import {
  CharacterMainStatKeys,
  CharacterMainStatKeysType,
  CharacterStats,
} from '../../types/character/character'
import { Bar } from '../_core/Bar'
import { Box } from '../_core/Box'
import { statKeyMap } from '../_core/StatusCard'

const getStatColor = (value: number) => {
  return 'grey'
  if (value < 40) return 'lightcoral'
  if (value < 80) return 'lightsalmon'
  if (value < 100) return 'gold'
  if (value < 120) return 'lightgreen'
  if (value < 150) return 'aqua'
  if (value < 200) return 'hotpink'
  return 'pink'
}

const getAccuracyColor = (value: number) => {
  return 'grey'
  if (value < 50) return 'lightcoral'
  if (value < 60) return 'lightsalmon'
  if (value < 70) return 'gold'
  if (value < 80) return 'lightgreen'
  if (value < 90) return 'aqua'
  return 'hotpink'
}

function hsl_col_perc(percent: number, start: number, end: number) {
  var a = percent / 100,
    b = (end - start) * a,
    c = b + start

  // Return a CSS HSL string
  return 'hsl(' + c + ', 90%, 40%)'
}

export const PartyCharacterBaseStats = (props: PartyCharacterProps) => {
  const { character } = props
  const percent = (key: keyof CharacterStats) =>
    character.stats[key] / (key.includes('Accuracy') ? 95 : 255)
  return (
    <Box marginLeft='16px'>
      {CharacterMainStatKeys.map((key) => (
        <Bar
          key={key}
          height='24px'
          value={character.stats[key]}
          max={key.includes('Accuracy') ? 95 : 255}
          background={hsl_col_perc(percent(key) * 100, -45, 200)}
          minWidth='180px'
          margin='1px'
        >
          <Box
            color='white'
            style={{
              fontSize: '14px',
              fontWeight: 600,
              textShadow: '0px 1px 2px rgba(0,0,0,1)',
            }}
          >
            {statKeyMap[key]}
          </Box>
          <Box flex='1' />
          <Box style={{ fontSize: '14px', fontFamily: 'Roboto Mono' }}>
            {character.stats[key]}
          </Box>
        </Bar>
      ))}
    </Box>
  )
}
