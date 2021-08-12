import { v4 } from 'uuid'
import { FireAttackUp } from '../../status/data/FireAttackUp'
import { Ability } from '../ability'

export const BlazeId = v4()
export const Blaze: Ability = {
  id: v4(),
  abilityId: BlazeId,
  name: 'Blaze',
  statuses: [
    {
      ...FireAttackUp(1, -1, true),
      isCritical: true,
    },
  ],
  immunities: [],
}
