import { Character } from '../../types/character/character'
import { CombatSystemCharacter } from './types'

export const convertToCombatSystemCharacter = (
  character: Character,
  partyId: string,
  isActiveCharacter: boolean,
): CombatSystemCharacter => {
  return {
    ...character,
    partyId,
    isActiveCharacter,
  }
}
