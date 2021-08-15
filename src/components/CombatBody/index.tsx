import { CombatBodyActions } from '../CombatBodyActions.tsx'
import { CombatBodyTargets } from './CombatBodyTargets'
import { Box } from '../_core/Box'
import { CombatMoveResults } from '../CombatMoveResults'
import { useCombatActions } from './useCombatActions'
import { useCombatAI } from './useCombatAI'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemBuffer } from '../../contexts/CombatSystemContext/CombatSystemBuffer'
import { useCombatSystemValidation } from '../../contexts/CombatSystemContext/CombatSystemValidation'
import { CombatBodySwitch } from './CombatBodySwitch'

export const CombatBody = () => {
  const { activeCharacter, getTargets, isCharacterPlayerCharacter } =
    useCombatSystem()
  const { moveBuffer, targetsBuffer } = useCombatSystemBuffer()
  const { moveResults, rolls, commitMove, commitTurn, commitSubsitution } =
    useCombatActions()
  const targetsOptions =
    moveBuffer && activeCharacter
      ? getTargets(moveBuffer, activeCharacter)
      : undefined

  useCombatAI()

  const { benchCharactersToAdd } = useCombatSystemValidation()

  return (
    <Box flex={1} marginTop='24px'>
      <Box flex='1' alignItems='center'>
        {benchCharactersToAdd > 0 && <CombatBodySwitch />}
        {!moveBuffer &&
          isCharacterPlayerCharacter(activeCharacter?.id || '') && (
            <CombatBodyActions commitSubsitution={commitSubsitution} />
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
