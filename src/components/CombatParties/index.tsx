import { PropsWithChildren } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { CombatCharacter } from '../CombatCharacter'
import { Box } from '../_core/Box'

export type CombatPartiesProps = {}

export const CombatParties = (props: PropsWithChildren<CombatPartiesProps>) => {
  const { children } = props
  const { parties } = useCombat()
  return (
    <Box flex='1' overflow='hidden' flexDirection='row' padding='0px 8px'>
      <Box padding='8px'>
        {parties[0] &&
          parties[0].characters.map((c) => (
            <CombatCharacter key={c.id} character={c} />
          ))}
      </Box>
      {children}
      <Box padding='8px'>
        {parties[1] &&
          parties[1].characters.map((c) => (
            <CombatCharacter key={c.id} character={c} />
          ))}
      </Box>
    </Box>
  )
}
