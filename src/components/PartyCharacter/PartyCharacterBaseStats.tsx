import { PartyCharacterProps } from '.'
import {
  CharacterMainStatKeys,
  CharacterMainStatKeysType,
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

export const PartyCharacterBaseStats = (props: PartyCharacterProps) => {
  const { character } = props
  return (
    <Box marginLeft='16px'>
      {CharacterMainStatKeys.map((key) => (
        <Bar
          key={key}
          height='20px'
          value={character.stats[key]}
          max={key.includes('Accuracy') ? 95 : 255}
          background={
            key.includes('Accuracy')
              ? getAccuracyColor(character.stats[key])
              : getStatColor(character.stats[key])
          }
          minWidth='180px'
          margin='1px'
        >
          <Box style={{ fontSize: '14px' }}>{statKeyMap[key]}</Box>
          <Box flex='1' />
          <Box style={{ fontSize: '14px', fontFamily: 'Roboto Mono' }}>
            {character.stats[key]}
          </Box>
        </Bar>
      ))}
    </Box>
  )
}
