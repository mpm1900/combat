import { Move } from '../move'
import { Modifier } from '../stats'

export type ElementalType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'earth'
  | 'thunder'
  | 'air'
  | 'ghost'
  | 'dark'
  | 'light'
export type Elemental = {
  id: string
  element: ElementalType
  modifiers: Modifier[]
  moves: Move[]
}
