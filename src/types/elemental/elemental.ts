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
  element: ElementalType
  modifiers: Modifier[]
}
