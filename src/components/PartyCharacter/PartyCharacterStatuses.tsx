import { PartyCharacterProps } from '.'
import { getImmunities, getStatuses } from '../../types/character/util'
import { Box } from '../_core/Box'

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
            Statuses
          </Box>
          <Box flexDirection='row'>
            {abilities.map((ability, i) => (
              <Box marginRight='4px'>
                <span>
                  <span>{ability.name}</span>
                  {i !== abilities.length - 1 && abilities.length !== 1
                    ? ', '
                    : ''}
                </span>
              </Box>
            ))}
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
            {statuses.map((status, i) => (
              <Box marginRight='4px'>
                <span>
                  <span
                    style={{
                      color: status.isPositive ? 'lightgreen' : 'lightcoral',
                    }}
                  >
                    {status.name}
                  </span>
                  {i !== statuses.length - 1 && statuses.length !== 1
                    ? ', '
                    : ''}
                </span>
              </Box>
            ))}
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
            {immunities.map((status, i) => (
              <Box marginRight='4px'>
                <span>
                  <span>{status.name}</span>
                  {i !== immunities.length - 1 && immunities.length !== 1
                    ? ', '
                    : ''}
                </span>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
