import Color from 'color'
import { useEffect, useMemo } from 'react'
import { useList } from '../../hooks/useList'
import { theme } from '../../theme'
import { ZERO_STATS } from '../../types/character/data/ZERO_STATS'
import { Box } from '../_core/Box'
import { Check } from '../_core/Check'
import { ResultText } from './ResultText'
import { ReactComponent as FocusedCheck } from '../../icons/skoll/allied-star.svg'
import { ReactComponent as CursedCheck } from '../../icons/lorc/skull-crossed-bones.svg'
import { useCombatSystem } from '../../contexts/CombatSystemContext'

export type CombatMoveResultChecksProps = {
  rolls: boolean[]
  checksDone: boolean
  resultsDone: boolean
  onDone?: () => void
}

export const CombatMoveResultsChecks = (props: CombatMoveResultChecksProps) => {
  const { rolls, resultsDone, checksDone, onDone } = props
  const { activeCharacter, getCharacterStats } = useCombatSystem()
  const [checksDoneArray, setCheckDone] = useList<boolean>(
    rolls.length,
    checksDone,
  )
  const perfectTextColor = useMemo(
    () => Color(theme.perfectCheckColor).lighten(0.8).rgb().toString(),
    [theme.perfectCheckColor],
  )
  const focusedCheckColor = useMemo(
    () => Color(theme.perfectCheckColor).lighten(0.4).rgb().toString(),
    [theme.perfectCheckColor],
  )
  const stats = useMemo(() => {
    return activeCharacter ? getCharacterStats(activeCharacter.id) : ZERO_STATS
  }, [activeCharacter])
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
          failureColor={
            stats.forceCombatCheckFailure > i
              ? 'rgba(94,50,50,0.54)'
              : undefined
          }
          successColor={
            checksDone
              ? stats.forceCombatCheckSuccess > i
                ? focusedCheckColor
                : isPerfect
                ? theme.perfectCheckColor
                : undefined
              : undefined
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
        >
          {stats.forceCombatCheckSuccess > i ? (
            <FocusedCheck />
          ) : stats.forceCombatCheckFailure > i ? (
            <CursedCheck />
          ) : undefined}
        </Check>
      ))}
      {checksDone && (
        <ResultText
          perfect={isPerfect}
          miss={isMiss}
          resultsDone={resultsDone}
          perfectTextColor={perfectTextColor}
        >
          PERFECT
        </ResultText>
      )}
    </Box>
  )
}
