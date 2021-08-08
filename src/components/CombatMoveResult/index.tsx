import { useEffect, useMemo, useState } from 'react'
import Color from 'color'
import { Box } from '../_core/Box'
import { MoveResult } from '../../types/move'
import { TargetResults } from './TargetResults'
import { CombatMoveResultChecks } from './CombatMoveResultChecks'
import { useCombatBodyResults } from '../CombatBody/CombatBodyResultsContext'

export interface CombatMoveResultProps {
  rolls: (boolean | null)[]
  results: MoveResult[]
  perfectColor?: string
  perfectText?: string
  onDamageDone?: () => void
  onDone?: () => void
}

export const DEFAULT_PERFECT_COLOR = '#fcba03'
export const CombatMoveResult = (props: CombatMoveResultProps) => {
  const {
    rolls,
    results,
    perfectText = 'PERFECT',
    perfectColor = DEFAULT_PERFECT_COLOR,
    onDamageDone,
    onDone,
  } = props
  const { damageDone, setDamageDone, checksDone, setChecksDone } =
    useCombatBodyResults()
  const [perfectCheckColor, setPerfectCheckColor] = useState(perfectColor)
  const perfectTextColor = useMemo(
    () => Color(perfectColor).lighten(0.8).rgb().toString(),
    [perfectColor],
  )

  const statusesCount = results.reduce((sum, result) => {
    return sum + result.statuses.target.length
  }, 0)

  const wrapper = {}
  useEffect(() => {
    console.log('damage done change', damageDone)
    if (damageDone) {
      onDamageDone && onDamageDone()
      setTimeout(() => {
        onDone && onDone()
      }, 2000 + statusesCount * 100)
    }
  }, [damageDone])

  return (
    <Box minWidth='366px' justifyContent='center' style={wrapper}>
      <CombatMoveResultChecks
        rolls={rolls}
        perfectCheckColor={perfectCheckColor}
        perfectText={perfectText}
        perfectTextColor={perfectTextColor}
      />
      {checksDone && (
        <Box flexDirection='row'>
          <Box flex={1} />
          <Box minWidth='400px' marginTop='16px'>
            <TargetResults
              results={results}
              onDone={() => {
                setPerfectCheckColor(perfectColor)
              }}
            />
          </Box>
          <Box flex={1} />
        </Box>
      )}
    </Box>
  )
}
