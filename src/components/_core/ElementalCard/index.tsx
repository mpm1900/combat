import { CharacterStats } from '../../../types/character/character'
import { Elemental } from '../../../types/elemental'
import { Box } from '../Box'
import { statKeyMap } from '../StatusCard'
import { TooltipCard } from '../TooltipCard'

export type ElementalCardProps = {
  element: Elemental
}

export const ElementalCard = (props: ElementalCardProps) => {
  const { element } = props
  const modKeys = element.modifiers.map((mod) =>
    Object.keys(mod.stats),
  ) as (keyof CharacterStats)[][]
  return (
    <TooltipCard>
      <Box style={{ fontFamily: 'Trade Winds' }}>{element.element}</Box>
      <Box style={{ fontSize: '14px' }}>
        {modKeys.map((keys, modIndex) =>
          keys.map((key) => {
            const mod = element.modifiers[modIndex]
            const eq = mod.stats[key]
            if (!eq) return null
            return (
              <Box key={`${element.element}-${key}`}>
                {eq.m !== 0 && (
                  <Box>
                    {statKeyMap[key]}: {eq.m > 0 ? '+' : ''}
                    {eq.m * 100}%
                  </Box>
                )}
                {eq.b !== 0 && (
                  <Box>
                    {statKeyMap[key]}: {eq.b > 0 ? '+' : ''}
                    {eq.b}
                  </Box>
                )}
              </Box>
            )
          }),
        )}
      </Box>
    </TooltipCard>
  )
}
