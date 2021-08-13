import { useEffect } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'

export const useCombatAI = () => {
  const { getActiveCharacter, getTargets, isCharacterPlayerCharacter } =
    useCombat()
  const character = getActiveCharacter()
  const { moveBuffer, setMoveBuffer, targetsBuffer, setTargetsBuffer } =
    useCombatBuffer()

  useEffect(() => {
    if (character && !moveBuffer && !targetsBuffer) {
      if (!isCharacterPlayerCharacter(character.id)) {
        const moveIndex = Math.floor(Math.random() * character.moves.length)
        const move = character.moves[moveIndex]
        if (move) {
          setMoveBuffer(move)
          const targets = getTargets(move, character)
          const targetsIndex = Math.floor(Math.random() * targets.length)
          setTargetsBuffer(targets[targetsIndex])
        }
      }
    }
  }, [character, moveBuffer, targetsBuffer])
}
