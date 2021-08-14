import { v4 } from 'uuid'
import { EarthImmunity } from '../../status/data/EarthImmunity'
import { Ability } from '../ability'

export const LevitateId = v4()
export const Levitate: Ability = {
  id: v4(),
  abilityId: LevitateId,
  name: 'Levitate',
  statuses: [
    {
      ...EarthImmunity(1, -1, true),
      conditionsType: 'and',
      conditions: [],
    },
  ],
  immunities: [],
}
