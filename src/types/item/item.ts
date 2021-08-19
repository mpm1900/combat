import { Ability } from '../ability/ability'
import { Move } from '../move'
import { Modifier } from '../stats'

export type Item = {
  id: string
  itemId: string
  name: string
  abilities: Ability[]
  moves: Move[]
  modifiers: Modifier[]
}
