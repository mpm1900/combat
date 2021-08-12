import { useMemo } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { MoveResult } from '../../types/move'
import { Box } from '../_core/Box'
import { colorMap } from '../_core/ElementalIcon'

export type CombatMoveResultsHeaderProps = {
  moveResults: MoveResult[]
}

export const CombatMoveResultsHeader = (
  props: CombatMoveResultsHeaderProps,
) => {
  const { moveResults } = props
  const { getActiveCharacter, isCharacterPlayerCharacter } = useCombat()
  const { moveBuffer } = useCombatBuffer()
  const character = useMemo(() => getActiveCharacter(), [])
  if (!character || !moveBuffer) return null

  return (
    <Box
      color='white'
      textAlign='center'
      marginBottom='16px'
      style={{ fontSize: '24px' }}
    >
      <span>
        <span
          style={{
            fontFamily: 'Trade Winds',
            color: isCharacterPlayerCharacter(character.id)
              ? 'lightblue'
              : 'lightsalmon',
          }}
        >
          {character.name}
        </span>
        <span style={{ padding: '0px 8px' }}> uses </span>
        <span
          style={{
            fontFamily: 'Trade Winds',
            color: colorMap[moveBuffer.element],
          }}
        >
          {moveBuffer.name}
        </span>
        {!moveResults.every((r) => r.target.id === character.id) && (
          <span style={{ padding: '0px 8px' }}> on </span>
        )}
      </span>
      {!moveResults.every((r) => r.target.id === character.id) && (
        <span>
          {moveResults.map((result, i) => (
            <span key={i}>
              <span
                style={{
                  fontFamily: 'Trade Winds',
                  color: isCharacterPlayerCharacter(result.target.id)
                    ? 'lightblue'
                    : 'lightsalmon',
                }}
              >
                {result.target.name}
              </span>
              {i === moveResults.length - 1
                ? ''
                : i === moveResults.length - 2
                ? ', and '
                : ', '}
            </span>
          ))}
        </span>
      )}
    </Box>
  )
}
