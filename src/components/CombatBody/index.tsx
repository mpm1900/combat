import { useCombat } from '../../contexts/CombatContext'
import { useCombatBuffer } from '../../contexts/CombatContext/buffer'
import { CombatBodyActions } from './CombatBodyActions'
import { CombatBodyTargets } from './CombatBodyTargets'
import { Box } from '../_core/Box'
import { CombatMoveResults } from '../CombatMoveResults'
import { useCombatDamage } from './useCombatDamage'
import { useCombatAI } from './useCombatAI'

export const CombatBody = () => {
  const { getActiveCharacter, getTargets, isCharacterPlayerCharacter } =
    useCombat()
  const { moveBuffer, targetsBuffer } = useCombatBuffer()
  const { moveResults, rolls, commitMove, commitTurn } = useCombatDamage()
  const character = getActiveCharacter()
  const targetsOptions =
    moveBuffer && character ? getTargets(moveBuffer, character) : undefined

  useCombatAI()

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
