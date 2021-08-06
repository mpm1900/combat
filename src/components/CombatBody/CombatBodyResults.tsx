import { useMemo, useState } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { MoveResult } from '../../types/move'
import { CombatMoveResult } from '../CombatMoveResult'
import { Box } from '../_core/Box'

export type CombatBodyResultsProps = {
  rolls: (boolean | null)[]
  moveResults: MoveResult[]
  commitMove: () => void
  nextTurn: () => void
}

export const CombatBodyResults = (props: CombatBodyResultsProps) => {
  const { rolls, moveResults, nextTurn, commitMove } = props
  const { getActiveCharacter } = useCombat()
  const { moveBuffer } = useCombatBuffer()
  const character = useMemo(() => getActiveCharacter(), [])

  if (!character || !moveBuffer) return null

  return (
    <Box padding='16px'>
      <h2 style={{ color: 'white', textAlign: 'center' }}>
        {character.name} uses {moveBuffer.name}
      </h2>
      <CombatMoveResult
        rolls={rolls}
        results={moveResults}
        onDamageDone={() => {}}
        onDone={() => {
          commitMove()
          nextTurn()
        }}
      />
    </Box>
  )
}
