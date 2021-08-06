import { useEffect, useState } from 'react'
import { Box } from '../_core/Box'
import { Check } from '../_core/Check'
import { ResultText } from './ResultText'

export type CombatMoveResultChecksProps = {
  rolls: (boolean | null)[]
  damageDone: boolean
  perfectCheckColor: string
  perfectText: string
  perfectTextColor: string
  onDone: () => void
}

export const CombatMoveResultChecks = (props: CombatMoveResultChecksProps) => {
  const {
    rolls,
    damageDone,
    perfectCheckColor,
    perfectText,
    perfectTextColor,
    onDone,
  } = props
  const [checksDone, setChecksDone] = useState(rolls.map((_) => false))
  const setCheckDone = (index: number) =>
    setChecksDone((d) => d.map((c, i) => (i === index ? true : c)))
  const allDone = checksDone.every(Boolean)
  const isPerfect = rolls.every(Boolean)
  const isMiss = !rolls.some(Boolean)

  useEffect(() => {
    if (allDone) {
      onDone()
    }
  }, [allDone])

  return (
    <Box flexDirection='row' position='relative' justifyContent='center'>
      {rolls.map((r, i) => (
        <Check
          key={i}
          size={100}
          delay={200 * i}
          value={r}
          successColor={
            allDone ? (isPerfect ? perfectCheckColor : undefined) : undefined
          }
          backgroundColor={
            allDone
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
      {allDone && (
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
