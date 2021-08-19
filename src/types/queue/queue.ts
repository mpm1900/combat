import {
  Character,
  CharacterStats,
  ResolvedCharacterStats,
} from '../character/character'
import { convertStats, getStats } from '../character/util'

export type QueueItem = {
  id: string
  value: number
}
export type Queue = QueueItem[]

export type QueueStats = {
  id: string
  value: ResolvedCharacterStats
}[]

export const initializeQueue = (characters: Character[]): Queue => {
  const stats: QueueStats = characters.map((c) => ({
    id: c.id,
    value: getStats(c),
  }))
  return consolidateQueue(
    stats
      .map((qs) => ({
        id: qs.id,
        value: qs.value.initiative,
        stats: qs.value,
      }))
      .filter((qi) => {
        const char = characters.find((c) => c.id === qi.id)
        if (!char) return false
        const stats = convertStats(char)
        return stats.healthRatio > 0
      }),
    characters,
  )
}

export const getDeltas = (stats: CharacterStats, distance: number): number => {
  const speed = stats.speed > 0 ? stats.speed : 0
  // distance = speed * t => t = distance / speed
  const t = speed === 0 ? 99999 : distance / speed
  return t
}

export const convertToDeltas = (queue: Queue, statArray: QueueStats) => {
  return queue.map((i) => {
    const stats = statArray.find((qs) => qs.id === i.id)?.value
    if (!stats) throw new Error('Bad Input Data: enQueue')
    const t = getDeltas(stats, i.value)
    return {
      id: i.id,
      value: t,
    }
  })
}

export const consolidateQueue = (queue: Queue, characters: Character[]) => {
  const statArray: QueueStats = characters.map((c) => ({
    id: c.id,
    value: getStats(c),
  }))
  const deltaToZero = convertToDeltas(queue, statArray)
  const minT = Math.min.apply(
    Math,
    deltaToZero.map((d) => d.value),
  )
  if (minT === 0) return queue
  return [
    ...queue.map((i) => {
      const stats = statArray.find((qs) => qs.id === i.id)?.value
      if (!stats) throw new Error('Bad Input Data: consolidateQueue')

      return {
        id: i.id,
        value: Math.round(i.value - minT * stats.speed),
      }
    }),
  ]
}

export const enQueue = (
  queue: Queue,
  activeId: string,
  characters: Character[],
  recovery: number,
): Queue => {
  const statArray: QueueStats = characters.map((c) => ({
    id: c.id,
    value: getStats(c),
  }))

  const queueToMove = [
    ...queue.filter((i) => i.id !== activeId),
    {
      id: activeId,
      value: Math.round(recovery),
    },
  ].filter((q) => {
    const character = characters.find((c) => c.id === q.id)
    const stats = statArray.find((s) => s.id === q.id)
    return character && stats && stats.value.healthRatio > 0
  })

  return validateQueue(consolidateQueue(queueToMove, characters))
}

export const validateQueue = (queue: Queue): Queue => {
  const validate = (queue: Queue): [Queue, number] => {
    let moves = 0
    let result = [...queue]
    result.forEach((item) => {
      const sameValueItem = result.find(
        (i) => i.value === item.value && i.id !== item.id,
      )
      const anotherIndex = sameValueItem ? result.indexOf(sameValueItem) : -1
      if (sameValueItem && anotherIndex > 0) {
        moves++
        result[anotherIndex] = {
          ...sameValueItem,
          value: sameValueItem?.value + 1,
        }
      }
    })
    return [result, moves]
  }

  let validation = validate(queue)
  while (validation[1] > 0) {
    validation = validate(validation[0])
  }
  return validation[0]
}

export const getActiveId = (queue: Queue): string => {
  const item = queue.find((i) => i.value === 0)
  return item?.id || ''
}

export const getMaxValue = (queue: Queue) =>
  Math.max.apply(
    Math,
    queue.map((d) => d.value),
  )
