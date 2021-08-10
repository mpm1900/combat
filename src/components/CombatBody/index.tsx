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

export const CombatBody = () => {
  const {
    addDamageToCharacter,
    addStatusesToCharacter,
    getActiveCharacter,
    getLiveCharacters,
    updateCharacter,
    getTargets,
    isCharacterPlayerCharacter,
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
    if (moveResults) return
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
          addStatusesToCharacter(char.id, moveResults[i].statuses.target)
          addStatusesToCharacter(character.id, moveResults[i].statuses.source)
          addDamageToCharacter(char.id, moveResults[i].totalDamage)
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
      })
      nextTurn()
      setMoveResults(undefined)
    }
  }

  useEffect(() => {
    if (character && !moveBuffer && !targetsBuffer) {
      if (!isCharacterPlayerCharacter(character.id)) {
        const moveIndex = Math.floor(Math.random() * character.moves.length)
        const move = character.moves[moveIndex]
        if (move) {
          setTimeout(() => {
            setMoveBuffer(move)
            const targets = getTargets(move, character)
            const targetsIndex = Math.floor(Math.random() * targets.length)
            setTargetsBuffer(targets[targetsIndex])
          })
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
        )}
      </Box>
    </Box>
  )
}
