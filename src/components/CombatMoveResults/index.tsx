import { Box } from '../_core/Box'
import { MoveResult } from '../../types/move'
import { CombatMoveResultsDetails } from './CombatMoveResultsDetails'
import { CombatMoveResultsChecks } from './CombatMoveResultsChecks'
import { CombatMoveResultsHeader } from './CombatMoveResultsHeader'
import { useEffect, useState } from 'react'
import { config, useSpring } from 'react-spring'

export interface CombatMoveResultProps {
  rolls: boolean[]
  moveResults?: MoveResult[]
  onChildrenDone?: () => void
  onDone?: () => void
}

export const CombatMoveResults = (props: CombatMoveResultProps) => {
  const { rolls, moveResults, onChildrenDone, onDone } = props
  const [checksDone, setChecksDone] = useState(false)
  const [resultsDone, setResultsDone] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (checksDone && resultsDone && !isDone) {
      onChildrenDone && onChildrenDone()
      setTimeout(() => {
        setIsDone(true)
      }, 2000)
    }
  }, [checksDone, resultsDone])

  const wrapperStyles = useSpring({
    opacity: isDone ? 0 : 1,
    config: config.slow,
    delay: 2000,
    onRest: () => {
      onDone && onDone()
    },
  })

  const innerStyles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  })

  if (!moveResults) return null

  return (
    <Box padding='0 16px' style={wrapperStyles}>
      <Box style={innerStyles}>
        <CombatMoveResultsHeader moveResults={moveResults} />
        <Box minWidth='366px' justifyContent='center'>
          <CombatMoveResultsChecks
            rolls={rolls}
            checksDone={checksDone}
            resultsDone={resultsDone}
            onDone={() => setChecksDone(true)}
          />
          {checksDone && (
            <Box flexDirection='row'>
              <Box flex={1} />
              <Box minWidth='400px' marginTop='16px'>
                <CombatMoveResultsDetails
                  moveResults={moveResults}
                  resultsDone={resultsDone}
                  onDone={() => setResultsDone(true)}
                />
              </Box>
              <Box flex={1} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
