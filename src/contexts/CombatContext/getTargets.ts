import { Character } from '../../types/character/character'
import { Move } from '../../types/move'
import { CombatParty } from './types'

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
  source: Character,
  parties: CombatParty[],
): string[][] => {
  const sourceParty = parties.find((party) =>
    party.characterIds.includes(source.id),
  )
  if (!sourceParty) throw new Error('Party not found. [getTargets]')
  const enemyParty = parties.find((party) => party.id !== sourceParty.id)
  if (!enemyParty) throw new Error('Invalid Combat state. [[getTargets]')
  switch (move.target) {
    case 'all':
      return [[...sourceParty.characterIds, ...enemyParty.characterIds]]
    case 'self':
      return [[source.id]]
    case 'controlled-party':
      return [sourceParty.characterIds]
    case 'controlled-target':
      return sourceParty.characterIds.map((id) => [id])
    case 'controlled-splash':
      // return getSplashTargets(sourceParty.characterIds)
      return sourceParty.characterIds.map((id) => [id])
    case 'uncontrolled-party':
      return [enemyParty.characterIds]
    case 'uncontrolled-target':
      return enemyParty.characterIds.map((id) => [id])
    case 'uncontrolled-splash':
      // return getSplashTargets(enemyParty.characterIds)
      return enemyParty.characterIds.map((id) => [id])
    default:
      return []
  }
}
