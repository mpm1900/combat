import { useEffect, useMemo, useState } from 'react'
import Color from 'color'
import { Box } from '../_core/Box'
import { MoveResult } from '../../types/move'
import { TargetResults } from './TargetResults'
import { CombatMoveResultChecks } from './CombatMoveResultChecks'
import { useCombatBodyResults } from '../CombatBody/CombatBodyResultsContext'

export interface CombatMoveResultProps {
  rolls: boolean[]
  results: MoveResult[]
  perfectColor?: string
  perfectText?: string
}

export const DEFAULT_PERFECT_COLOR = '#fcba03'
export const CombatMoveResult = (props: CombatMoveResultProps) => {
  const {
    rolls,
    results,
    perfectText = 'PERFECT',
    perfectColor = DEFAULT_PERFECT_COLOR,
  } = props
  const { checksDone } = useCombatBodyResults()
  const [perfectCheckColor, setPerfectCheckColor] = useState(perfectColor)
  const perfectTextColor = useMemo(
    () => Color(perfectColor).lighten(0.8).rgb().toString(),
    [perfectColor],
  )

  const wrapper = {}

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
