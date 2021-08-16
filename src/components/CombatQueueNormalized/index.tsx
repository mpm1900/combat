import { useMemo } from 'react'
import { config, useTransition } from 'react-spring'
import { ReactComponent as Forward } from '../../icons/delapouite/fast-forward-button.svg'
import { Character } from '../../types/character/character'
import { getStats } from '../../types/character/util'
import { convertToDeltas, QueueStats } from '../../types/queue/queue'
import { CombatQueueProps } from '../CombatQueue'
import { Box } from '../_core/Box'
import { Icon } from '../_core/Icon'
import { ElementalType } from '../../types/elemental'
import { colorMap } from '../_core/ElementalIcon'
import { useCombatSystem } from '../../contexts/CombatSystemContext'

const margin = 16
const width = 18
const space = width + margin

export const CombatQueueNormalized = (props: CombatQueueProps) => {
  const { queue, characters } = props
  const { getCharacter } = useCombatSystem()
  const statArray: QueueStats = useMemo(
    () =>
      characters.map((c) => ({
        id: c.id,
        value: getStats(c),
      })),
    [characters],
  )
  const [first, ...charactersInOrder] = useMemo(() => {
    return convertToDeltas(queue, statArray)
      .sort((a, b) => a.value - b.value)
      .map((delta) => getCharacter(delta.id))
      .filter((c) => c !== undefined) as Character[]
  }, [queue, statArray])

  const list = [...charactersInOrder]

  const magicWidthCoef = 7.2833
  const getX = (index: number) =>
    list.reduce((sum, c, i) => {
      const w = index > i ? c.name.length * magicWidthCoef + space : 0
      return sum + w
    }, 0)
  const transitions = useTransition(
    list.map((char: Character, i: number) => ({
      ...char,
      x: getX(i),
    })),
    {
      key: (char: Character) => char.id,
      leave: { opacity: 0 },
      enter: ({ x }) => ({ opacity: 1, transform: `translate3d(${x}px,0,0)` }),
      update: ({ x }) => ({ transform: `translate3d(${x}px,0,0)` }),
      config: config.slow,
    },
  )

  return (
    <Box
      margin='0px 8px 8px 16px'
      height='36px'
      flexDirection='row'
      alignItems='center'
    >
      {transitions((styles, character) => {
        return (
          <Box
            key={character.id}
            style={styles}
            flexDirection='row'
            alignItems='center'
            position='absolute'
          >
            <Icon color='rgba(255,255,255,0.18)' width='18px'>
              <Forward />
            </Icon>
            <Box
              height='20px'
              width={`${character.name.length * magicWidthCoef}px`}
              marginLeft='8px'
              marginRight='8px'
              overflow='hidden'
              display='inline-block'
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                lineHeight: '20px',
                fontSize: '12px',
                fontFamily: 'Roboto Mono',
              }}
              color={colorMap[character.elements[0].element as ElementalType]}
            >
              {character.name}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
