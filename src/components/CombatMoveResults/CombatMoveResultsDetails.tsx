import { useEffect, useState } from 'react'
import { useSpring } from 'react-spring'
import { MoveResult } from '../../types/move'
import { CombatCharacterAvatar } from '../CombatCharacterAvatar'
import { AnimatedNumber } from '../_core/AnimatedNumber'
import { Box } from '../_core/Box'
import { ReactComponent as Evade } from '../../icons/darkzaitzev/running-ninja.svg'
import { theme } from '../../theme'
import { Check } from '../_core/Check'
import { StatusIcon } from '../_core/StatusIcon'
import { useList } from '../../hooks/useList'

export type CombatMoveResultsDetailsProps = {
  moveResults: MoveResult[]
  resultsDone: boolean
  onDone?: () => void
}

export const CombatMoveResultsDetails = (
  props: CombatMoveResultsDetailsProps,
) => {
  const { moveResults, resultsDone, onDone } = props
  const [resultsDoneArray, setResultDone] = useList<boolean>(
    moveResults.length,
    false,
  )

  useEffect(() => {
    if (resultsDoneArray.every(Boolean) && !resultsDone) {
      onDone && onDone()
    }
  }, [resultsDoneArray])

  return (
    <Box padding='16px 8px' background='rgba(0,0,0,0.54)'>
      {moveResults.map((result, i) => (
        <Box marginTop={i > 0 ? '12px' : 0}>
          <TargetResult
            result={result}
            resultsDone={resultsDone}
            onDone={() => setResultDone(i, true)}
          />
        </Box>
      ))}
    </Box>
  )
}

type TargetResultProps = {
  result: MoveResult
  resultsDone: boolean
  onDone: () => void
}
const TargetResult = (props: TargetResultProps) => {
  const { result, resultsDone, onDone } = props
  const [damageDone, setDamageDone] = useState(resultsDone)
  const [dodgeDone, setDodgeDone] = useState(false)
  const [statusesDoneArray, setStatusDone] = useList<boolean>(
    result.statuses.target.length,
    resultsDone,
  )

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
      damage: damageDone ? result.totalDamage : 0,
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
    if (damageDone && statusesDoneArray.every(Boolean)) {
      onDone()
    }
  }, [damageDone, statusesDoneArray])

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
          <Check
            size={32}
            borderWidth='2px'
            value={result.dodged}
            isDone={damageDone}
            successColor={theme.statsPink}
            onRest={() => setDodgeDone(true)}
          >
            <Evade />
          </Check>
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
                  isDone={statusesDoneArray[i]}
                  successColor={theme.statsGreen}
                  onRest={() => setStatusDone(i, true)}
                >
                  {<StatusIcon status={status} height='16px' width='16px' />}
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
