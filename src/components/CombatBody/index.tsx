import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import {
  getRolls,
  Move as MoveType,
  MoveResult,
  resolveMove,
} from '../../types/move'
import { AccuracyStats, Character } from '../../types/character/character'
import { getStats } from '../../types/character/util'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCombatTurn } from '../../contexts/CombatContext/turn'
import { CombatBodyActions } from './CombatBodyActions'
import { FadeWindow } from '../_core/FadeWindow'
import { CombatBodyTargets } from './CombatBodyTargets'
import { CombatBodyResults } from './CombatBodyResults'
import { Check } from '../_core/Check'
import { Box } from '../_core/Box'

export const CombatBody = () => {
  const {
    addDamageToCharacter,
    addStatusesToCharacter,
    getActiveCharacter,
    updateCharacter,
    getTargets,
  } = useCombat()
  const { nextTurn } = useCombatTurn()
  const { moveBuffer, targetsBuffer } = useCombatBuffer()
  const [rolls, setRolls] = useState<(boolean | null)[]>([])
  const [moveResults, setMoveResults] = useState<MoveResult[] | undefined>()

  const character = getActiveCharacter()
  const targetsOptions =
    moveBuffer && character ? getTargets(moveBuffer, character) : undefined

  const rollDamage = (
    move: MoveType,
    source: Character,
    targets: Character[],
  ) => {
    const stats = getStats(source)
    const rolls = getRolls(
      move.checks,
      stats[`${move.type}Accuracy` as keyof AccuracyStats] + move.offset,
    )
    setRolls(rolls)
    setMoveResults(
      targets.map((target) => {
        return resolveMove(source, target, move, rolls)
      }),
    )
  }

  useEffect(() => {
    if (character && moveBuffer && targetsBuffer) {
      rollDamage(moveBuffer, character, targetsBuffer)
    }
  }, [moveBuffer, targetsBuffer])

  const commitMove = () => {
    if (character && moveBuffer && moveResults) {
      targetsBuffer?.forEach((char, i) => {
        if (moveResults[i]) {
          addStatusesToCharacter(char.id, moveResults[i].statuses.target)
          addStatusesToCharacter(character.id, moveResults[i].statuses.source)
          addDamageToCharacter(char.id, moveResults[i].totalDamage)
        }
      })
      updateCharacter(character.id, (c) => ({
        ...c,
        energyOffset: c.energyOffset + moveBuffer.energyCost,
      }))
    }
  }

  return (
    <Box flex={1}>
      <FadeWindow flex='1' alignItems='center'>
        {!moveBuffer && <CombatBodyActions />}
        {targetsOptions && !targetsBuffer && (
          <CombatBodyTargets targetsOptions={targetsOptions} />
        )}
        {moveResults && targetsBuffer && character && (
          <CombatBodyResults
            moveResults={moveResults}
            rolls={rolls}
            commitMove={commitMove}
            nextTurn={nextTurn}
          />
        )}
      </FadeWindow>
    </Box>
  )
}
