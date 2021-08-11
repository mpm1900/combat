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
import { useEffect, useState } from 'react'
import { useCombatTurn } from '../../contexts/CombatContext/turn'
import { CombatBodyActions } from './CombatBodyActions'
import { CombatBodyTargets } from './CombatBodyTargets'
import { Box } from '../_core/Box'
import { CombatMoveResults } from '../CombatMoveResults'
import { min } from '../../types/equation'
import { ProtectedId } from '../../types/status/data/Protected'

export const CombatBody = () => {
  const {
    addDamageToCharacter,
    addStatusesToCharacter,
    getActiveCharacter,
    getLiveCharacters,
    getCharacterPartyId,
    updateCharacter,
    getTargets,
    isCharacterPlayerCharacter,
    updateQueueItemById,
  } = useCombat()
  const { turnId, nextTurn } = useCombatTurn()
  const { moveBuffer, setMoveBuffer, targetsBuffer, setTargetsBuffer } =
    useCombatBuffer()
  const [rolls, setRolls] = useState<boolean[]>([])
  const [moveResults, setMoveResults] = useState<MoveResult[] | undefined>()
  const [moveCommited, setMoveCommitted] = useState(false)

  const character = getActiveCharacter()
  const targetsOptions =
    moveBuffer && character ? getTargets(moveBuffer, character) : undefined

  const rollDamage = (
    move: MoveType,
    source: Character,
    targets: Character[],
  ) => {
    console.log('rolling damage', move.name)
    if (moveResults) return
    const stats = getStats(source)
    const rolls = getRolls(
      move.checks,
      stats[`${move.type}Accuracy` as keyof AccuracyStats] + move.offset,
    )
    setRolls(rolls)
    console.log('setting move results', move.name)
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

          addStatusesToCharacter(character.id, moveResults[i].statuses.source)
          const protectedStatus = char.statuses.find(
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
              statuses: c.statuses.filter((s) => s.statusId !== ProtectedId),
            }))
          } else {
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
        const stats = getStats(character)
        return {
          ...c,
          damage: min(c.damage - stats.activeTurnHealthRegen, 0),
        }
      })
      getLiveCharacters().forEach((char) => {
        updateCharacter(char.id, (c) => {
          const stats = getStats(c)
          return {
            ...c,
            damage: min(c.damage - stats.turnHealthRegen, 0),
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
        setMoveResults(undefined)
      }, 1)
    }
  }

  useEffect(() => {
    if (character && !moveBuffer && !targetsBuffer) {
      if (!isCharacterPlayerCharacter(character.id)) {
        console.log('AI MOVE')
        const moveIndex = Math.floor(Math.random() * character.moves.length)
        const move = character.moves[moveIndex]
        if (move) {
          console.log('CHOSING FOR CHAR', move.name)
          setMoveBuffer(move)
          const targets = getTargets(move, character)
          const targetsIndex = Math.floor(Math.random() * targets.length)
          setTargetsBuffer(targets[targetsIndex])
          // rollDamage(move, character, targets[targetsIndex])
        }
      }
    }
  }, [character, moveBuffer, targetsBuffer])

  return (
    <Box flex={1} marginTop='24px'>
      <Box flex='1' alignItems='center'>
        {!moveBuffer && isCharacterPlayerCharacter(character?.id || '') && (
          <CombatBodyActions />
        )}
        {targetsOptions &&
          !targetsBuffer &&
          isCharacterPlayerCharacter(character?.id || '') && (
            <CombatBodyTargets targetsOptions={targetsOptions} />
          )}
        {targetsBuffer && (
          <>
            <CombatMoveResults
              moveResults={moveResults}
              rolls={rolls}
              onChildrenDone={() => {
                commitMove()
              }}
              onDone={() => {
                commitTurn()
              }}
            />
          </>
        )}
      </Box>
    </Box>
  )
}
