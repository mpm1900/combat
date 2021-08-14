import { v4 } from 'uuid'
import { GrassAttackUp } from '../../status/data/GrassAttackUp'
import { Ability } from '../ability'

export const OvergrowId = v4()
export const Overgrow: Ability = {
  id: v4(),
  abilityId: OvergrowId,
  name: 'Overgrow',
  statuses: [
    {
      ...GrassAttackUp(1, -1, true),
      conditionsType: 'and',
      conditions: [
        {
          stat: 'healthRatio',
          value: 1 / 3,
          type: 'less-than',
        },
      ],
    },
  ],
  immunities: [],
}
