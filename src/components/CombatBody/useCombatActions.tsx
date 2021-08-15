import { useEffect, useState } from 'react'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemBuffer } from '../../contexts/CombatSystemContext/CombatSystemBuffer'
import { useCombatSystemTurn } from '../../contexts/CombatSystemContext/CombatSystemTurn'
import { AccuracyStats, Character } from '../../types/character/character'
import {
  getStats,
  getStatsAndEquations,
  getStatuses,
} from '../../types/character/util'
import { min } from '../../types/equation'
import { getRolls, Move, MoveResult, resolveMove } from '../../types/move'
import { ProtectedId } from '../../types/status/data/Protected'

export const useCombatDamage = () => {
  const {
    activeCharacter,
    activeCharacters,
    getCharacterStats,
    getLiveCharacters,
    updateCharacter,
    addStatusesToCharacter,
    addDamageToCharacter,
    updateQueueItemById,
    substituteCharacters,
  } = useCombatSystem()
  const { turnId, nextTurn } = useCombatSystemTurn()
  const { moveBuffer, targetsBuffer } = useCombatSystemBuffer()
  const [rolls, setRolls] = useState<boolean[]>([])
  const [moveResults, setMoveResults] = useState<MoveResult[] | undefined>()
  const [moveCommited, setMoveCommitted] = useState(false)

  const clearMoveResults = () => setMoveResults(undefined)

  useEffect(() => {
    clearMoveResults()
  }, [activeCharacter?.id])

  const rollDamage = (move: Move, source: Character, targets: Character[]) => {
    if (moveResults) return
    const stats = getCharacterStats(source.id)
    const rolls = getRolls(
      move.checks,
      stats[`${move.type}Accuracy` as keyof AccuracyStats] + move.offset,
      stats.forceCombatCheckSuccess,
      stats.forceCombatCheckFailure,
    )
    setRolls(rolls)
    setMoveResults(
      targets.map((target) => {
        return resolveMove(source, target, move, rolls)
      }),
    )
  }

  useEffect(() => {
    if (activeCharacter && moveBuffer && targetsBuffer && !moveResults) {
      rollDamage(moveBuffer, activeCharacter, targetsBuffer)
      setMoveCommitted(false)
    }
  }, [moveBuffer, targetsBuffer, moveResults])

  const commitSub = (benchId: string) => {
    if (!activeCharacter) return
    substituteCharacters(activeCharacter.id, benchId)
    nextTurn()
  }

  const commitMove = () => {
    if (activeCharacter && moveBuffer && moveResults && !moveCommited) {
      setMoveCommitted(true)
      targetsBuffer?.forEach((char, i) => {
        if (moveResults[i]) {
          if (i === 0) {
            addStatusesToCharacter(
              activeCharacter.id,
              moveResults[i].statuses.source,
            )
          }
          const protectedStatus = getStatuses(char).find(
            (s) => s.statusId === ProtectedId,
          )
          const hasEnemySourceStatus =
            char.partyId !== activeCharacter.partyId &&
            moveResults[i].statuses.target.length > 0

          if (
            protectedStatus &&
            (moveResults[i].totalDamage > 0 || hasEnemySourceStatus)
          ) {
            updateCharacter(char.id, (c) => ({
              ...c,
              statuses: c.statuses.filter((s) => !s.removeOnHit),
            }))
          } else {
            updateCharacter(char.id, (c) => ({
              ...c,
              statuses: c.statuses.filter((s) => !s.removeOnHit),
            }))
            addStatusesToCharacter(char.id, moveResults[i].statuses.target)
            addDamageToCharacter(char.id, moveResults[i].totalDamage)
          }
        }
      })
      updateCharacter(activeCharacter.id, (c) => {
        return {
          ...c,
          energyOffset: c.energyOffset + moveBuffer.energyCost,
        }
      })
    }
  }

  const commitTurn = () => {
    if (activeCharacter && moveBuffer) {
      updateCharacter(activeCharacter.id, (c) => {
        const [stats, { stats: mods }] = getStatsAndEquations(activeCharacter)
        return {
          ...c,
          damage: min(c.damage - mods.activeTurnHealthRegen(stats.health), 0),
        }
      })
      getLiveCharacters(activeCharacters).forEach((char) => {
        updateCharacter(char.id, (c) => {
          const [stats, { stats: mods }] = getStatsAndEquations(activeCharacter)
          return {
            ...c,
            damage: min(c.damage - mods.turnHealthRegen(stats.health), 0),
          }
        })
        if (char.id !== activeCharacter.id) {
          updateQueueItemById(char.id, (qi) => {
            const stats = getStats(char)
            return {
              ...qi,
              value: min(qi.value + stats.queuePositionOffset, 0),
            }
          })
        }
      })

      nextTurn()
    }
  }

  return {
    rolls,
    moveResults,
    moveCommited,
    rollDamage,
    clearMoveResults,
    commitMove,
    commitTurn,
    commitSub,
  }
}
