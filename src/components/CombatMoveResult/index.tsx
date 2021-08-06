import { useEffect, useMemo, useState } from 'react'
import Color from 'color'
import { useSpring } from 'react-spring'
import { Box } from '../_core/Box'
import { MoveResult } from '../../types/move'
import { TargetResults } from './TargetResults'
import { CombatMoveResultChecks } from './CombatMoveResultChecks'

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
  const [perfectCheckColor, setPerfectCheckColor] = useState(perfectColor)
  const perfectTextColor = useMemo(
    () => Color(perfectColor).lighten(0.8).rgb().toString(),
    [perfectColor],
  )
  const [checksDone, setChecksDone] = useState(false)
  const [damageDone, setDamageDone] = useState(false)

  const statusesCount = results.reduce((sum, result) => {
    return sum + result.statuses.target.length
  }, 0)

  const wrapper = {}
  useEffect(() => {
    if (damageDone) {
      // onDamageDone && onDamageDone()
      setTimeout(() => {
        onDone && onDone()
      }, 2000 + statusesCount * 100)
    }
  }, [damageDone])

  return (
    <Box minWidth='366px' justifyContent='center' style={wrapper}>
      <CombatMoveResultChecks
        rolls={rolls}
        damageDone={damageDone}
        perfectCheckColor={perfectCheckColor}
        perfectText={perfectText}
        perfectTextColor={perfectTextColor}
        onDone={() => setChecksDone(true)}
      />
      {checksDone && (
        <Box flexDirection='row'>
          <Box flex={1} />
          <Box minWidth='400px' marginTop='16px'>
            <TargetResults
              results={results}
              onDone={() => {
                setPerfectCheckColor(perfectColor)
                setDamageDone(true)
              }}
            />
          </Box>
          <Box flex={1} />
        </Box>
      )}
    </Box>
  )
}
