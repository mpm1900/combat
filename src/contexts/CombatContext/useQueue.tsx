import { useState } from 'react'
import { Character } from '../../types/character/character'
import { Move } from '../../types/move'
import {
  enQueue,
  getActiveId,
  initializeQueue,
  Queue,
} from '../../types/queue/queue'

export const useQueue = (initialValue?: Queue) => {
  const [queue, set] = useState<Queue>(initialValue || [])
  const enqueue = (characters: Character[], move: Move) => {
    set((q) => enQueue(q, getActiveId(q), characters, move))
  }
  const initialize = (characters: Character[]) => {
    set(initializeQueue(characters))
  }
  return {
    queue,
    enqueue,
    initialize,
  }
}
