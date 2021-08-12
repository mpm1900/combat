import { useEffect, useState } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { useCombatTurn } from '../../contexts/CombatContext/turn'
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
    getActiveCharacter,
    getCharacterPartyId,
    getLiveCharacters,
    updateCharacter,
    addStatusesToCharacter,
    addDamageToCharacter,
    updateQueueItemById,
  } = useCombat()
  const { turnId, nextTurn } = useCombatTurn()
  const { moveBuffer, targetsBuffer } = useCombatBuffer()
  const [rolls, setRolls] = useState<boolean[]>([])
  const [moveResults, setMoveResults] = useState<MoveResult[] | undefined>()
  const [moveCommited, setMoveCommitted] = useState(false)
  const character = getActiveCharacter()

  const clearMoveResults = () => setMoveResults(undefined)

  const rollDamage = (move: Move, source: Character, targets: Character[]) => {
    if (moveResults) return
    const stats = getStats(source)
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
    if (character && moveBuffer && targetsBuffer && !moveResults) {
      rollDamage(moveBuffer, character, targetsBuffer)
    }
  }, [character, moveBuffer, targetsBuffer, moveResults])

  useEffect(() => {
    setMoveCommitted(false)
  }, [turnId])

  const commitMove = () => {
    if (character && moveBuffer && moveResults && !moveCommited) {
      setMoveCommitted(true)
      targetsBuffer?.forEach((char, i) => {
        if (moveResults[i]) {
          if (i === 0) {
            addStatusesToCharacter(character.id, moveResults[i].statuses.source)
          }
          const protectedStatus = getStatuses(char).find(
            (s) => s.statusId === ProtectedId,
          )
          const hasEnemySourceStatus =
            getCharacterPartyId(char.id) !==
              getCharacterPartyId(character.id) &&
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
      updateCharacter(character.id, (c) => {
        return {
          ...c,
          energyOffset: c.energyOffset + moveBuffer.energyCost,
        }
      })
    }
  }

  const commitTurn = () => {
    if (character && moveBuffer) {
      updateCharacter(character.id, (c) => {
        const [stats, { stats: mods }] = getStatsAndEquations(character)
        return {
          ...c,
          damage: min(c.damage - mods.activeTurnHealthRegen(stats.health), 0),
        }
      })
      getLiveCharacters().forEach((char) => {
        updateCharacter(char.id, (c) => {
          const [stats, { stats: mods }] = getStatsAndEquations(character)
          return {
            ...c,
            damage: min(c.damage - mods.turnHealthRegen(stats.health), 0),
          }
        })
        if (char.id !== character.id) {
          updateQueueItemById(char.id, (qi) => {
            const stats = getStats(char)
            return {
              ...qi,
              value: qi.value + stats.queuePositionOffset,
            }
          })
        }
      })

      nextTurn()
      setTimeout(() => {
        clearMoveResults()
      }, 1)
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
  }
}
