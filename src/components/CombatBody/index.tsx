import { CombatBodyActions } from '../CombatBodyActions.tsx'
import { CombatBodyTargets } from './CombatBodyTargets'
import { Box } from '../_core/Box'
import { CombatMoveResults } from '../CombatMoveResults'
import { useCombatDamage } from './useCombatActions'
import { useCombatAI } from './useCombatAI'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemBuffer } from '../../contexts/CombatSystemContext/CombatSystemBuffer'

export const CombatBody = () => {
  const { activeCharacter, getTargets, isCharacterPlayerCharacter } =
    useCombatSystem()
  const { moveBuffer, targetsBuffer } = useCombatSystemBuffer()
  const { moveResults, rolls, commitMove, commitTurn } = useCombatDamage()
  const targetsOptions =
    moveBuffer && activeCharacter
      ? getTargets(moveBuffer, activeCharacter)
      : undefined

  useCombatAI()

  return (
    <Box flex={1} marginTop='24px'>
      <Box flex='1' alignItems='center'>
        {!moveBuffer &&
          isCharacterPlayerCharacter(activeCharacter?.id || '') && (
            <CombatBodyActions />
          )}
        {targetsOptions &&
          !targetsBuffer &&
          isCharacterPlayerCharacter(activeCharacter?.id || '') && (
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
