import { Character } from '../../types/character/character'
import { Move } from '../../types/move'
import { CombatSystemCharacter } from './types'

const getSplashTargets = (ids: string[]): string[][] => {
  if (ids.length === 0) return []
  if (ids.length === 1) return [[ids[0]]]
  if (ids.length === 2) return [[ids[0], ids[1]]]
  if (ids.length >= 3)
    return [
      [ids[0], ids[1]],
      [ids[0], ids[1], ids[2]],
      [ids[1], ids[2]],
    ]
  return []
}

export const getTargetIds = (
  move: Move,
  source: CombatSystemCharacter,
  partyIds: string[],
  getActiveCharacters: (partyId: string) => CombatSystemCharacter[],
): string[][] => {
  const sourcePartyId = source.partyId
  const enemyPartyId = partyIds.find((id) => id !== sourcePartyId)
  if (!enemyPartyId) throw new Error('Invalid Combat state. [[getTargets]')
  switch (move.target) {
    case 'all':
      return [
        [
          ...getActiveCharacters(sourcePartyId).map((c) => c.id),
          ...getActiveCharacters(enemyPartyId).map((c) => c.id),
        ],
      ]
    case 'self':
      return [[source.id]]
    case 'controlled-party':
      return [getActiveCharacters(sourcePartyId).map((c) => c.id)]
    case 'controlled-target':
      return getActiveCharacters(sourcePartyId).map((c) => [c.id])
    case 'controlled-splash':
      // return getSplashTargets(sourceParty.characterIds)
      return getActiveCharacters(sourcePartyId).map((c) => [c.id])
    case 'uncontrolled-party':
      return [getActiveCharacters(enemyPartyId).map((c) => c.id)]
    case 'uncontrolled-target':
      return getActiveCharacters(enemyPartyId).map((c) => [c.id])
    case 'uncontrolled-splash':
      return getActiveCharacters(enemyPartyId).map((c) => [c.id])
    default:
      return []
  }
}
