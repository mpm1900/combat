import { useMemo } from 'react'
import { config, useTransition } from 'react-spring'
import { Character } from '../../types/character/character'
import { getStats } from '../../types/character/util'
import {
  convertToDeltas,
  getMaxValue,
  Queue as QueueType,
  QueueItem as QueueItemType,
} from '../../types/queue/queue'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { AnimatedNumberValue } from '../_core/AnimatedNumber'
import { Box } from '../_core/Box'
import { QueueWrapper } from './style'

export type QueueProps = {
  queue: QueueType
  characters: Character[]
}

export const Queue = (props: QueueProps) => {
  const { queue, characters } = props
  const mv = getMaxValue(queue)
  const maxValue = mv < 0 ? 0 : mv
  const character = (id: string) => characters.find((c) => c.id === id)
  const getPosition = (value: number) => `${(value / maxValue) * 100}%`
  const [first, ...rest] = queue.sort((a, b) => a.value - b.value)
  const transitions = useTransition(rest, {
    key: (item: QueueItemType) => item.id,
    from: { left: '150%', offset: 0, opacity: 0 },
    leave: { left: '0%', offset: -76, opacity: 0 },
    enter: ({ value }) => ({
      opacity: 1,
      offset: 0,
      left: getPosition(value),
    }),
    update: ({ value }) => ({
      offset: 0,
      left: getPosition(value),
    }),
    config: config.slow,
  })
  const deltas = useMemo(() => {
    const statsArray = characters.map((c) => ({ id: c.id, value: getStats(c) }))
    return convertToDeltas(queue, statsArray)
  }, [characters, queue])

  return (
    <Box flex={1} margin='0 0 8px 0' position='relative' paddingRight='60px'>
      <QueueWrapper>
        {transitions((styles, item) => (
          <CombatCharacterAvatar
            marginTop='-2px'
            textAlign='center'
            padding='4px'
            character={character(item.id) as Character}
            style={{
              ...styles,
              transform: styles.offset.to((v) => `translate3d(${v}px, 0,0)`),
            }}
            position='absolute'
          >
            {(deltas.find((d) => d.id === item.id)?.value || 0) * 1000}
          </CombatCharacterAvatar>
        ))}
        <Box
          flex='1'
          flexDirection='row'
          border='1px solid rgba(255,255,255,0.18)'
          height='48px'
        >
          <Box
            flex={1}
            style={{
              width: `${100 / maxValue}%`,
              height: '100%',
              background: 'rgba(255,255,255,0.09)',
            }}
          />
        </Box>
      </QueueWrapper>
    </Box>
  )
}
