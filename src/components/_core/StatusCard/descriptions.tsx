import { ConfusedId } from '../../../types/status/data/Confused'
import { ProtectedId } from '../../../types/status/data/Protected'
import { TauntedId } from '../../../types/status/data/Taunted'

export const statusDescriptions: Record<string, string> = {
  [ConfusedId]: 'This character chooses a move and target at random.',
  [ProtectedId]:
    'Negates all damage and statuses from the next attack that targets the affected character.',
  [TauntedId]:
    'If a move from an enemy could target this character, it must target this character.',
}
