import { CharacterStats } from '../character/character'
import { EquationObject, Equation } from '../equation'

export type BaseStats = { [key: string]: number }
export type ResolvedModifier = {
  stats: {
    [Priperty in keyof CharacterStats]: EquationObject
  }
}
export type StatEquations = {
  stats: {
    [Priperty in keyof CharacterStats]: Equation
  }
}
export type Modifier = {
  stats: Partial<
    {
      [Priperty in keyof CharacterStats]: EquationObject
    }
  >
}
