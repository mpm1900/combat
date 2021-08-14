import { v4 } from 'uuid'
import { WaterAttackUp } from '../../status/data/WaterAttackUp'
import { Ability } from '../ability'

export const TorrentId = v4()
export const Torrent: Ability = {
  id: v4(),
  abilityId: TorrentId,
  name: 'Torrent',
  statuses: [
    {
      ...WaterAttackUp(1, -1, true),
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
