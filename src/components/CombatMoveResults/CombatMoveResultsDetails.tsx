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
      <Box
        color='white'
        marginBottom='8px'
        textAlign='center'
        style={{ fontFamily: 'Trade Winds' }}
      >
        Targets
      </Box>
      {moveResults.map((result, i) => (
        <Box marginTop={i > 0 ? '12px' : 0}>
          <TargetResult
            result={result}
            resultsDone={resultsDone}
            onDone={() => setResultDone(i, true)}
          />
        </Box>
      ))}
      <SourceResults
        result={moveResults[0]}
        resultsDone={resultsDone}
        onDone={() => {}}
      />
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
        <CombatCharacterAvatar
          height='36px'
          width='36px'
          margin='8px'
          character={result.target}
        />
        {result.move.power ? (
          <Box width='100px' alignItems='center' position='relative'>
            <AnimatedNumber
              color={result.critical && damageDone ? 'lightblue' : 'white'}
              style={{ fontSize: '32px', fontWeight: 900 }}
              value={damage.damage}
            />
          </Box>
        ) : null}
        {result.source.id !== result.target.id && (
          <Box alignItems='center' position='relative'>
            <Check
              size={32}
              borderWidth='2px'
              value={result.dodged}
              isDone={dodgeDone}
              successColor={theme.statsPink}
              onRest={() => setDodgeDone(true)}
            >
              <Evade />
            </Check>
            {result.critical && damageDone && (
              <Box
                position='absolute'
                justifyContent='center'
                alignItems='center'
                style={{
                  fontSize: '24px',
                  inset: '0px',
                  color: 'rgba(255,255,255,1)',
                  fontFamily: 'Trade Winds',
                  textShadow: '0px 2px 10px rgba(0,0,0,0.81)',
                }}
              >
                CRIT!
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box height={result.statuses.target.length ? '32px' : '0px'}>
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
                  margin='4px'
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

export const SourceResults = (props: TargetResultProps) => {
  const { result, resultsDone, onDone } = props
  const [statusesDoneArray, setStatusDone] = useList<boolean>(
    result.statuses.source.length,
    resultsDone,
  )

  if (!result || result.statuses.source.length === 0) return null

  return (
    <>
      <Box
        color='white'
        marginTop='8px'
        textAlign='center'
        style={{ fontFamily: 'Trade Winds' }}
      >
        Source
      </Box>
      {result.statuses.source.map((status, i) => (
        <Box
          key={status.id}
          color='white'
          flexDirection='row'
          justifyContent='center'
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
    </>
  )
}
