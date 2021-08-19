import { v4 } from 'uuid'
import { CharacterMainStatKeysType } from '../../character/character'
import { Item } from '../item'

export const createNature = (
  name: string,
  pStat: CharacterMainStatKeysType,
  mStat: CharacterMainStatKeysType,
): Item => {
  return {
    id: v4(),
    itemId: v4(),
    name: `${name} Item`,
    moves: [],
    modifiers: [
      {
        stats: {
          [pStat]: { m: 0.1, b: 0 },
          [mStat]: { m: -0.1, b: 0 },
        },
      },
    ],
    abilities: [],
  }
}
