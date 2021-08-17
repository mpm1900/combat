import { CombatBody } from '../../components/CombatBody'
import { CombatHeader } from '../../components/CombatHeader'
import { CombatParty } from '../../components/CombatParties'
import { Box } from '../../components/_core/Box'
import { useCombatSystem } from '../../contexts/CombatSystemContext'

export const Combat = () => {
  const { initialized } = useCombatSystem()
  return initialized ? (
    <Box flex={1}>
      <CombatHeader />
      <Box flex='1' flexDirection='row' overflow='auto'>
        <CombatParty index={0} side='left' />
        <CombatBody />
        <CombatParty index={1} side='right' />
      </Box>
    </Box>
  ) : (
    <Box>Loading...</Box>
  )
}
