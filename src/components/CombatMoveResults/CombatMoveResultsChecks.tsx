import Color from 'color'
import { useEffect, useMemo, useState } from 'react'
import { useList } from '../../hooks/useList'
import { theme } from '../../theme'
import { Box } from '../_core/Box'
import { Check } from '../_core/Check'
import { ResultText } from './ResultText'

export type CombatMoveResultChecksProps = {
  rolls: boolean[]
  checksDone: boolean
  resultsDone: boolean
  onDone?: () => void
}

export const CombatMoveResultsChecks = (props: CombatMoveResultChecksProps) => {
  const { rolls, resultsDone, checksDone, onDone } = props
  const [checksDoneArray, setCheckDone] = useList<boolean>(
    rolls.length,
    checksDone,
  )
  const [perfectCheckColor, setPerfectCheckColor] = useState(
    theme.perfectCheckColor,
  )
  const perfectTextColor = useMemo(
    () => Color(theme.perfectCheckColor).lighten(0.8).rgb().toString(),
    [theme.perfectCheckColor],
  )
  const isPerfect = rolls.every(Boolean)
  const isMiss = !rolls.some(Boolean)

  useEffect(() => {
    if (!checksDone && checksDoneArray.every(Boolean)) {
      onDone && onDone()
    }
  }, [checksDoneArray])

  return (
    <Box flexDirection='row' position='relative' justifyContent='center'>
      {rolls.map((r, i) => (
        <Check
          key={i}
          size={100}
          delay={100 * i}
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
            setCheckDone(i, true)
          }}
        />
      ))}
      {checksDone && (
        <ResultText
          perfect={isPerfect}
          miss={isMiss}
          damageDone={resultsDone}
          perfectTextColor={perfectTextColor}
        >
          PERFECT
        </ResultText>
      )}
    </Box>
  )
}
