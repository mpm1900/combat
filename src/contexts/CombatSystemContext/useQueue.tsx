import { useState } from 'react'
import { Move } from '../../types/move'
import {
  enQueue,
  getActiveId,
  initializeQueue,
  Queue,
  QueueItem,
} from '../../types/queue/queue'
import { CombatSystemCharacter } from './types'

export const useQueue = (initialValue?: Queue) => {
  const [queue, set] = useState<Queue>(initialValue || [])
  const enqueue = (characters: CombatSystemCharacter[], move: Move) => {
    set((q) => enQueue(q, getActiveId(q), characters, move))
  }
  const updateById = (id: string, fn: (item: QueueItem) => QueueItem) => {
    set((q) => q.map((qi) => (qi.id === id ? fn(qi) : qi)))
  }
  const initialize = (characters: CombatSystemCharacter[]) => {
    set(initializeQueue(characters))
  }
  return {
    queue,
    set,
    enqueue,
    updateById,
    initialize,
  }
}
