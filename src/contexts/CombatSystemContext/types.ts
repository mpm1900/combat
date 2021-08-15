import {
  Character,
  ResolvedCharacterStats,
} from '../../types/character/character'

export type CombatSystemCharacter = Character & {
  partyId: string
  isActiveCharacter: boolean
}

export type CombatSystemCharacterStats = {
  id: string
  stats: ResolvedCharacterStats
}
