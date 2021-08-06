import { Character, CharacterStats } from '../character/character'
import { getStats } from '../character/util'
import { Move } from '../move'

export type QueueItem = {
  id: string
  value: number
}
export type Queue = QueueItem[]

export type QueueStats = {
  id: string
  value: CharacterStats
}[]

export const initializeQueue = (characters: Character[]): Queue => {
  const stats: QueueStats = characters.map((c) => ({
    id: c.id,
    value: getStats(c),
  }))
  const maxValue = Math.max.apply(
    Math,
    stats.map((qs) => qs.value.initiative),
  )
  return consolidateQueue(
    stats.map((qs) => ({
      id: qs.id,
      value: qs.value.initiative,
    })),
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
  move: Move,
): Queue => {
  const statArray: QueueStats = characters.map((c) => ({
    id: c.id,
    value: getStats(c),
  }))

  const queueToMove = [
    ...queue.filter((i) => i.id !== activeId),
    {
      id: activeId,
      value: Math.round(move.recovery),
    },
  ].filter((q) => {
    const character = characters.find((c) => c.id === q.id)
    const stats = statArray.find((s) => s.id === q.id)
    return character && stats && character.damage < stats.value.health
  })

  return validateQueue(consolidateQueue(queueToMove, characters), statArray)
}

export const validateQueue = (queue: Queue, stats: QueueStats): Queue => {
  const validate = (queue: Queue, stats: QueueStats): [Queue, number] => {
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

  let validation = validate(queue, stats)
  while (validation[1] > 0) {
    validation = validate(validation[0], stats)
  }
  return validation[0]
}

export const getActiveId = (queue: Queue): string => {
  const item = queue.find((i) => i.value === 0)
  if (!item) return ''
  return item.id
}

export const getMaxValue = (queue: Queue) =>
  Math.max.apply(
    Math,
    queue.map((d) => d.value),
  )
