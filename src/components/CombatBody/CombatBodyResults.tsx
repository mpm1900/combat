import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { MoveResult } from '../../types/move'
import { CombatMoveResult } from '../CombatMoveResult'
import { Box } from '../_core/Box'
import { colorMap } from '../_core/ElementalIcon'

const RenderCounter = () => {
  const ref = useRef(0)
  ref.current = ref.current + 1
  return <Box color='white'>{ref.current}</Box>
}

export type CombatBodyResultsProps = {
  rolls: boolean[]
  moveResults: MoveResult[]
}

export const CombatBodyResults = (props: CombatBodyResultsProps) => {
  const { rolls, moveResults } = props
  const { getActiveCharacter, isCharacterPlayerCharacter } = useCombat()
  const { moveBuffer } = useCombatBuffer()
  const character = useMemo(() => getActiveCharacter(), [])

  if (!character || !moveBuffer) return null

  return (
    <Box padding='16px'>
      <Box
        color='white'
        textAlign='center'
        marginBottom='24px'
        style={{ fontSize: '24px' }}
      >
        <span>
          <strong
            style={{
              color: isCharacterPlayerCharacter(character.id)
                ? 'lightblue'
                : 'lightsalmon',
            }}
          >
            {character.name}
          </strong>{' '}
          uses{' '}
          <strong
            style={{
              color: colorMap[moveBuffer.element],
            }}
          >
            {moveBuffer.name}
          </strong>{' '}
          on{' '}
        </span>
        <span>
          {moveResults.map((result, i) => (
            <>
              <strong
                style={{
                  color: isCharacterPlayerCharacter(result.target.id)
                    ? 'lightblue'
                    : 'lightsalmon',
                }}
              >
                {result.target.name}
              </strong>
              {i === moveResults.length - 1
                ? ''
                : i === moveResults.length - 2
                ? ', and '
                : ', '}
            </>
          ))}
        </span>
      </Box>

      <CombatMoveResult rolls={rolls} results={moveResults} />
    </Box>
  )
}
