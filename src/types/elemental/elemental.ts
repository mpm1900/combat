import { Modifier } from '../stats'

export type ElementalType =
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
  element: ElementalType
  modifiers: Modifier[]
}
