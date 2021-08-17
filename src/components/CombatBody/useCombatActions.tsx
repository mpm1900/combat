import { useEffect, useState } from 'react'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemBuffer } from '../../contexts/CombatSystemContext/CombatSystemBuffer'
import { useCombatSystemTurn } from '../../contexts/CombatSystemContext/CombatSystemTurn'
import { useLogs } from '../../contexts/LogsContext'
import { AccuracyStats, Character } from '../../types/character/character'
import {
  getModifiers,
  getStats,
  getStatsAndEquations,
  getStatuses,
} from '../../types/character/util'
import { min } from '../../types/equation'
import { getRolls, Move, MoveResult, resolveMove } from '../../types/move'
import { ProtectedId } from '../../types/status/data/Protected'
import { LogCharacter, LogElement } from '../CombatLogs'
import { Box } from '../_core/Box'

export const useCombatActions = () => {
  const { push } = useLogs()
  const {
    activeCharacter,
    activeCharacters,
    getCharacter,
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
    const successes = rolls.filter(Boolean).length
    push(
      <>
        <LogCharacter characterId={source.id}>{source.name}</LogCharacter>
        {` uses `}
        <LogElement element={move.element}>{move.name}</LogElement>
        <Box color={successes === rolls.length ? 'gold' : undefined}>
          ({successes}/{rolls.length})
        </Box>
      </>,
    )
    setMoveResults(
      targets.map((target, i) => {
        const result = resolveMove(source, target, move, rolls)
        if (i === 0) {
        }
        return result
      }),
    )
  }

  useEffect(() => {
    if (activeCharacter && moveBuffer && targetsBuffer && !moveResults) {
      rollDamage(moveBuffer, activeCharacter, targetsBuffer)
      setMoveCommitted(false)
    }
  }, [moveBuffer, targetsBuffer, moveResults])

  const commitMove = () => {
    if (activeCharacter && moveBuffer && moveResults && !moveCommited) {
      setMoveCommitted(true)
      targetsBuffer?.forEach((char, i) => {
        if (moveResults[i]) {
          const result = moveResults[i]
          push(
            <>
              {result.critical ? (
                <>
                  <Box marginRight='4px'>Critical Hit on</Box>
                  <LogCharacter characterId={char.id}>{char.name}</LogCharacter>
                </>
              ) : (
                ''
              )}
            </>,
          )
          push(
            <>
              {result.dodged ? (
                <>
                  <LogCharacter characterId={char.id}>{char.name}</LogCharacter>
                  {'dodged the attack. '}
                </>
              ) : (
                ''
              )}
            </>,
          )
          moveResults[i].statuses.target.forEach((status) => {
            if (!status.isApplied) return
            push(
              <>
                <LogCharacter characterId={char.id}>{char.name}</LogCharacter>
                {`became`}
                <Box marginLeft='4px' color='white'>
                  {status.name}
                </Box>
              </>,
            )
          })
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
    if (activeCharacter) {
      updateCharacter(activeCharacter.id, (c) => {
        const [stats, { stats: mods }] = getStatsAndEquations(activeCharacter)
        return {
          ...c,
          statuses: c.statuses.filter((s) => !s.removeOnActiveTurnEnd),
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
            const [stats, { stats: mods }] = getStatsAndEquations(char)
            const modifs = getModifiers(activeCharacter)
            console.log(qi.value, mods.queuePositionOffset(qi.value))
            return {
              ...qi,
              value: min(qi.value + mods.queuePositionOffset(qi.value), 0),
            }
          })
        }
      })

      nextTurn()
    }
  }

  const commitSubsitution = (id: string) => {
    if (activeCharacter) {
      const benchCharacter = getCharacter(id)
      if (!benchCharacter) return
      push(
        <>
          <LogCharacter characterId={activeCharacter.id}>
            {activeCharacter.name}
          </LogCharacter>
          <Box marginRight='4px'>subed out for</Box>
          <LogCharacter characterId={id}>{benchCharacter.name}</LogCharacter>
        </>,
      )
      substituteCharacters(activeCharacter.id, id)
      commitTurn()
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
    commitSubsitution,
  }
}
