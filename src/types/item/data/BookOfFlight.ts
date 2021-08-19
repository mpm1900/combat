import { v4 } from 'uuid'
import { Levitate } from '../../ability/data/Levitate'
import { AirSlash } from '../../move/data/AirSlash'
import { Item } from '../item'

export const BookOfFlightId = v4()
export const BookOfFlight = (): Item => ({
  id: v4(),
  itemId: BookOfFlightId,
  name: 'Book of Flight',
  abilities: [Levitate],
  moves: [AirSlash],
  modifiers: [
    {
      stats: {
        speed: {
          m: 0.05,
          b: 10,
        },
      },
    },
  ],
})
