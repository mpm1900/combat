import { useState } from 'react'
import { Character } from '../../types/character/character'
import { Move } from '../../types/move'
import {
  enQueue,
  getActiveId,
  initializeQueue,
  Queue,
  QueueItem,
} from '../../types/queue/queue'

export const useQueue = (initialValue?: Queue) => {
  const [queue, set] = useState<Queue>(initialValue || [])
  const enqueue = (characters: Character[], move: Move) => {
    set((q) => enQueue(q, getActiveId(q), characters, move))
  }
  const updateById = (id: string, fn: (item: QueueItem) => QueueItem) => {
    set((q) => q.map((qi) => (qi.id === id ? fn(qi) : qi)))
  }
  const initialize = (characters: Character[]) => {
    set(initializeQueue(characters))
  }
  return {
    queue,
    enqueue,
    updateById,
    initialize,
  }
}
