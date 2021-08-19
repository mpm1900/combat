import { Ability } from '../ability/ability'
import { Move } from '../move'

export type Item = {
  id: string
  itemId: string
  name: string
  abilities: Ability[]
  moves: Move[]
}
