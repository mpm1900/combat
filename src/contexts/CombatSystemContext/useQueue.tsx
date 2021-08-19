import { useState } from 'react'
import { Move } from '../../types/move'
import {
  consolidateQueue,
  enQueue,
  getActiveId,
  initializeQueue,
  Queue,
  QueueItem,
} from '../../types/queue/queue'
import { CombatSystemCharacter } from './types'

export const useQueue = (initialValue?: Queue) => {
  const [queue, set] = useState<Queue>(initialValue || [])
  const enqueue = (characters: CombatSystemCharacter[], recovery: number) => {
    const _queue = enQueue(queue, getActiveId(queue), characters, recovery)
    set(_queue)
    return getActiveId(_queue)
  }
  const updateById = (id: string, fn: (item: QueueItem) => QueueItem) => {
    set((q) => q.map((qi) => (qi.id === id ? fn(qi) : qi)))
  }
  const initialize = (characters: CombatSystemCharacter[]) => {
    set(initializeQueue(characters))
  }
  const consolidate = (characters: CombatSystemCharacter[]) => {
    set((q) => consolidateQueue(q, characters))
  }
  return {
    queue,
    set,
    enqueue,
    updateById,
    initialize,
    consolidate,
  }
}
