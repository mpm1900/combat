import { useEffect, useState } from 'react'
import { useCombatBodyResults } from '../CombatBody/CombatBodyResultsContext'
import { Box } from '../_core/Box'
import { Check } from '../_core/Check'
import { ResultText } from './ResultText'

export type CombatMoveResultChecksProps = {
  rolls: boolean[]
  perfectCheckColor: string
  perfectText: string
  perfectTextColor: string
}

export const CombatMoveResultChecks = (props: CombatMoveResultChecksProps) => {
  const { rolls, perfectCheckColor, perfectText, perfectTextColor } = props
  const { damageDone, checksDone, setChecksDone } = useCombatBodyResults()
  const [checksDoneArray, setChecksDoneArray] = useState(
    rolls.map((_) => checksDone),
  )
  const setCheckDone = (index: number) =>
    setChecksDoneArray((d) => d.map((c, i) => (i === index ? true : c)))
  const isPerfect = rolls.every(Boolean)
  const isMiss = !rolls.some(Boolean)

  useEffect(() => {
    if (!checksDone && checksDoneArray.every(Boolean)) {
      setChecksDone(true)
    }
  }, [checksDoneArray])

  return (
    <Box flexDirection='row' position='relative' justifyContent='center'>
      {rolls.map((r, i) => (
        <Check
          key={i}
          size={100}
          delay={200 * i}
          value={r}
          isDone={checksDoneArray[i]}
          successColor={
            checksDone ? (isPerfect ? perfectCheckColor : undefined) : undefined
          }
          backgroundColor={
            checksDone
              ? r
                ? 'rgba(255,255,255,0.18)'
                : 'rgba(0,0,0,0.54)'
              : 'rgba(0,0,0,0.18)'
          }
          onRest={() => {
            setCheckDone(i)
          }}
        />
      ))}
      {checksDone && (
        <ResultText
          perfect={isPerfect}
          miss={isMiss}
          damageDone={damageDone}
          perfectTextColor={perfectTextColor}
        >
          {perfectText}
        </ResultText>
      )}
    </Box>
  )
}
