import { v4 } from 'uuid'
import { Dazed } from '../../status/data/Dazed'
import { Ability } from '../ability'

export const SturdyId = v4()
export const Sturdy: Ability = {
  id: v4(),
  abilityId: SturdyId,
  name: 'Sturdy',
  statuses: [],
  immunities: [Dazed(1, -1, true)],
}
