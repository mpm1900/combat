import { useEffect, useState } from 'react'
import { useSpring } from 'react-spring'
import { MoveResult } from '../../types/move'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { AnimatedNumber } from '../_core/AnimatedNumber'
import { Box } from '../_core/Box'
import { ReactComponent as Success } from '../../icons/delapouite/thumb-up.svg'
import { ReactComponent as Failure } from '../../icons/delapouite/thumb-down.svg'
import { ReactComponent as Arrow } from '../../icons/delapouite/fast-forward-button.svg'
import { theme } from '../../theme'
import { Icon } from '../_core/Icon'
import { Check } from '../_core/Check'

export type TargetResultsProps = {
  results: MoveResult[]
  onDone: () => void
}

export const TargetResults = (props: TargetResultsProps) => {
  const { results, onDone } = props
  const [resultsDone, setResultsDone] = useState(results.map((_) => false))
  const setStatusDone = (index: number) =>
    setResultsDone((r) => r.map((d, i) => (i === index ? true : d)))

  useEffect(() => {
    if (resultsDone.every(Boolean)) {
      onDone()
    }
  }, [resultsDone])

  return (
    <Box padding='16px 8px' background='rgba(0,0,0,0.54)'>
      {results.map((result, i) => (
        <Box marginTop={i > 0 ? '12px' : 0}>
          <TargetResult result={result} onDone={() => setStatusDone(i)} />
        </Box>
      ))}
    </Box>
  )
}

type TargetResultProps = {
  result: MoveResult
  onDone: () => void
}
const TargetResult = (props: TargetResultProps) => {
  const { result, onDone } = props
  const [damageDone, setDamageDone] = useState(false)

  const wrapper = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 200,
    },
    onRest: () => {
      if (result.totalDamage === 0) {
        setDamageDone(true)
      }
    },
  })
  const damage = useSpring({
    damage: result.totalDamage,
    from: {
      damage: 0,
    },
    config: {
      mass: 10,
      tension: 320,
      friction: 110,
      clamp: true,
    },
    onRest: () => setDamageDone(true),
  })

  useEffect(() => {
    if (damageDone) {
      onDone()
    }
  }, [damageDone])

  return (
    <Box style={wrapper} overflow='hidden'>
      <Box flexDirection='row' alignItems='center' justifyContent='center'>
        <AnimatedNumber
          color='white'
          width='80px'
          alignItems='center'
          style={{ fontSize: '32px', fontWeight: 'bolder' }}
          value={damage.damage}
        />
        <Box width='64px' alignItems='center' margin='0 16px 0 0'>
          <Icon width='32px' color='rgba(255,255,255,0.36)'>
            <Arrow />
          </Icon>
        </Box>

        <CombatCharacterAvatar
          height='36px'
          width='36px'
          character={result.target}
        />
      </Box>
      <Box height={result.statuses.target.length ? '42px' : '0px'}>
        {damageDone && (
          <Box flexDirection='row' justifyContent='center'>
            {result.statuses.target.map((status, i) => (
              <Box
                key={status.id}
                color='white'
                flexDirection='row'
                alignItems='center'
                padding='0 4px'
              >
                <Check
                  size={20}
                  padding='2px'
                  borderWidth={'2px'}
                  value={status.isApplied}
                  successColor={theme.statsGreen}
                  // onRest={() => setStatusDone(i)}
                >
                  {status.isApplied ? <Success /> : <Failure />}
                </Check>
                <Box opacity={status.isApplied ? 1 : 0.54}>{status.name}</Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
