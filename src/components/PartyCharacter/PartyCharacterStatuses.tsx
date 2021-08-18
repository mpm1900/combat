import { PartyCharacterProps } from '.'
import { getImmunities, getStatuses } from '../../types/character/util'
import { AbilityList } from '../_core/AbilityList'
import { Box } from '../_core/Box'
import { StatusList } from '../_core/StatusList'

export const PartyCharacterStatuses = (props: PartyCharacterProps) => {
  const { character } = props
  const statuses = getStatuses(character)
  const immunities = getImmunities(character)
  const abilities = character.abilities
  return (
    <Box style={{ fontSize: '14px' }}>
      {abilities.length > 0 && (
        <>
          <Box
            marginTop='16px'
            style={{ fontFamily: 'Trade Winds', fontSize: '16px' }}
          >
            Abilities
          </Box>
          <Box flexDirection='row'>
            <AbilityList abilities={abilities} />
          </Box>
        </>
      )}
      {statuses.length > 0 && (
        <>
          <Box
            marginTop='16px'
            style={{ fontFamily: 'Trade Winds', fontSize: '16px' }}
          >
            Statuses
          </Box>
          <Box flexDirection='row'>
            <StatusList statuses={statuses} showIcon={false} type='source' />
          </Box>
        </>
      )}
      {immunities.length > 0 && (
        <>
          <Box
            marginTop='16px'
            style={{ fontFamily: 'Trade Winds', fontSize: '16px' }}
          >
            Immunities
          </Box>
          <Box flexDirection='row'>
            <StatusList statuses={immunities} showIcon={false} type='source' />
          </Box>
        </>
      )}
    </Box>
  )
}
