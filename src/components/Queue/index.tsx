import { config, useTransition } from 'react-spring'
import { Character } from '../../types/character/character'
import {
  getMaxValue,
  Queue as QueueType,
  QueueItem as QueueItemType,
} from '../../types/queue/queue'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
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
  const mva = Array(maxValue).fill(undefined)
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
  return (
    <Box flex={1} margin='0 0 8px 8px' position='relative' paddingRight='60px'>
      <QueueWrapper>
        {transitions((styles, item) => (
          <CombatCharacterAvatar
            marginTop='-2px'
            character={character(item.id) as Character}
            style={{
              ...styles,
              transform: styles.offset.to((v) => `translate3d(${v}px, 0,0)`),
            }}
            position='absolute'
          />
        ))}
        <Box
          flex='1'
          flexDirection='row'
          border='1px solid rgba(255,255,255,0.18)'
          height='48px'
        >
          {mva.map((_, i) => (
            <Box
              key={i}
              style={{
                width: `${100 / maxValue}%`,
                height: '100%',
                background: 'rgba(255,255,255,0.09)',
                borderRight: '1px solid rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </Box>
      </QueueWrapper>
    </Box>
  )
}
