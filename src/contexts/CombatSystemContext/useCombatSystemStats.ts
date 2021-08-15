import { useState } from 'react'
import { ResolvedCharacterStats } from '../../types/character/character'
import { ZERO_STATS } from '../../types/character/data/ZERO_STATS'
import { CombatSystemCharacterStats } from './types'

export const useCombatSystemStats = () => {
  const [characterStats, setCharacterStats] = useState<
    CombatSystemCharacterStats[]
  >([])

  const getCharacterStats = (id: string) =>
    characterStats.find((stats) => stats.id === id)?.stats || ZERO_STATS

  const updateCharacterStats = (
    id: string | undefined,
    fn: (c: ResolvedCharacterStats) => ResolvedCharacterStats,
  ) => {
    if (id) {
      setCharacterStats((list) =>
        list.map((c) =>
          c.id === id
            ? {
                ...c,
                stats: fn(c.stats),
              }
            : c,
        ),
      )
    }
  }

  return {
    characterStats,
    getCharacterStats,
    setCharacterStats,
    updateCharacterStats,
  }
}
