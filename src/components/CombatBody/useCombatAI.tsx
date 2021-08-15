import { useEffect } from 'react'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemBuffer } from '../../contexts/CombatSystemContext/CombatSystemBuffer'
import { min } from '../../types/equation'

export const useCombatAI = () => {
  const {
    activeCharacter,
    getTargets,
    isCharacterPlayerCharacter,
    getCharacterStats,
  } = useCombatSystem()
  const { moveBuffer, bufferMove, targetsBuffer, setTargetsBuffer } =
    useCombatSystemBuffer()

  const targetsOptions =
    moveBuffer && activeCharacter
      ? getTargets(moveBuffer, activeCharacter)
      : undefined

  useEffect(() => {
    if (activeCharacter && !moveBuffer) {
      if (!isCharacterPlayerCharacter(activeCharacter.id)) {
        const stats = getCharacterStats(activeCharacter.id)
        const availableEnergy = min(
          stats.energy - activeCharacter.energyOffset,
          0,
        )
        const moveList = activeCharacter.moves.filter(
          (m) => m.energyCost <= availableEnergy,
        )
        if (moveList.length > 0) {
          const moveIndex = Math.floor(Math.random() * moveList.length)
          const move = moveList[moveIndex]
          if (move) {
            bufferMove(move)
          }
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
