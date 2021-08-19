import { Item } from '../item'
import { BookOfFlight } from './BookOfFlight'
import { createNature } from './Nature'

export const ALL_ITEMS: Item[] = [
  BookOfFlight(),
  createNature('Lonely', 'physicalAttack', 'physicalDefense'),
  createNature('Adamant', 'physicalAttack', 'specialAttack'),
  createNature('Naughty', 'physicalAttack', 'specialDefense'),
  createNature('Brave', 'physicalAttack', 'speed'),
  createNature('Bold', 'physicalDefense', 'physicalAttack'),
  createNature('Impish', 'physicalDefense', 'specialAccuracy'),
  createNature('Lax', 'physicalDefense', 'specialDefense'),
  createNature('Relaxed', 'physicalDefense', 'speed'),
  createNature('Modest', 'specialAttack', 'physicalAttack'),
  createNature('Mild', 'specialAttack', 'physicalDefense'),
  createNature('Rash', 'specialAttack', 'specialDefense'),
  createNature('Quiet', 'specialAttack', 'speed'),
  createNature('Calm', 'specialDefense', 'physicalAttack'),
  createNature('Gentle', 'specialDefense', 'physicalDefense'),
  createNature('Careful', 'specialDefense', 'specialAttack'),
  createNature('Sassy', 'specialDefense', 'speed'),
  createNature('Timid', 'speed', 'physicalAttack'),
  createNature('Hasty', 'speed', 'physicalDefense'),
  createNature('Jolly', 'speed', 'specialAttack'),
  createNature('Naive', 'speed', 'specialDefense'),
]
