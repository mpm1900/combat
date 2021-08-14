import { ZERO_EQUATION } from './data'
import { Equation, EquationObject } from './equation'

export const makeEquationObject = (m: number, b: number): EquationObject => ({
  m,
  b,
})

export const makeEquation: (o: EquationObject) => Equation =
  ({ m, b }) =>
  (x) =>
    m * x + b

export const addEquations = (
  a: EquationObject = ZERO_EQUATION,
  b: EquationObject = ZERO_EQUATION,
): EquationObject => ({
  m: a.m + b.m,
  b: a.b + b.b,
})

export const negEquation = (o: EquationObject) => ({
  m: o.m * -1,
  b: o.b * -1,
})

export const max = (value: number, n: number) => (value > n ? n : value)

export const min = (value: number, n: number) => (value < n ? n : value)

export const minmax = (value: number, min: number, max: number) =>
  value > max ? max : value < min ? min : value
