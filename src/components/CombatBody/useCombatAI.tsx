import { useEffect } from 'react'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemBuffer } from '../../contexts/CombatSystemContext/CombatSystemBuffer'

export const useCombatAI = () => {
  const { activeCharacter, getTargets, isCharacterPlayerCharacter } =
    useCombatSystem()
  const { moveBuffer, bufferMove, targetsBuffer, setTargetsBuffer } =
    useCombatSystemBuffer()

  const targetsOptions =
    moveBuffer && activeCharacter
      ? getTargets(moveBuffer, activeCharacter)
      : undefined

  useEffect(() => {
    if (activeCharacter && !moveBuffer) {
      if (!isCharacterPlayerCharacter(activeCharacter.id)) {
        const moveIndex = Math.floor(
          Math.random() * activeCharacter.moves.length,
        )
        const move = activeCharacter.moves[moveIndex]
        if (move) {
          bufferMove(move)
        }
      }
    }
  }, [activeCharacter, moveBuffer])

  useEffect(() => {
    if (activeCharacter && !targetsBuffer && targetsOptions) {
      if (!isCharacterPlayerCharacter(activeCharacter.id)) {
        const targetsIndex = Math.floor(Math.random() * targetsOptions.length)
        setTargetsBuffer(targetsOptions[targetsIndex])
      }
    }
  }, [activeCharacter, targetsBuffer, targetsOptions])
}
