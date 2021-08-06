import { useChain, useSpring, useSpringRef } from '@react-spring/core'
import { useEffect, useState } from 'react'
import { useSprings } from 'react-spring'
import { MoveResult } from '../../types/move'
import { AnimatedNumber } from '../_core/AnimatedNumber'
import { Box } from '../_core/Box'

export interface ChecksDetailsProps {
  done: boolean
  results: MoveResult[]
  onDone?: () => void
}

export const ChecksDetails = (props: ChecksDetailsProps) => {
  const { done, results, onDone } = props
  const [damageDone, setDamageDone] = useState(false)
  const wrapper = useSpring({})
  useEffect(() => {
    if (results.every((r) => r.totalDamage === 0) && onDone) {
      onDone()
    }
  }, [])
  useEffect(() => {
    if (damageDone && onDone) {
      onDone()
    }
  }, [damageDone])
  const damageValues = useSprings(
    results.length,
    results.map((value, i) => {
      return {
        damage: done ? value.totalDamage : 0,
        opacity: done ? 1 : 0,
        from: {
          damage: 0,
          opacity: 0,
        },
        config: {
          mass: 10,
          tension: 320,
          friction: 110,
          clamp: true,
        },
        onRest: () => {
          setDamageDone(true)
        },
      }
    }),
  )
  const damageAfter = useSpring({
    from: {
      color: 'white',
      textShadow: '0px 0px 40px rgba(255,255,255,0.6)',
    },
    to: {
      color: damageDone ? 'white' : 'white',
      textShadow: damageDone
        ? '0px 4px 10px rgba(0,0,0,1)'
        : '0px 0px 40px rgba(255,255,255,0.6)',
    },
    config: {
      mass: 5,
      tension: 3600,
      friction: 1000,
      clamp: true,
    },
  })
  const extraSlideRef = useSpringRef()
  const extraSlide = useSpring({
    ref: extraSlideRef,
    from: {
      width: '0px',
    },
    to: {
      width: damageDone ? '200px' : '0px',
    },
    delay: 200,
  })
  const testStringRef = useSpringRef()

  useChain([extraSlideRef, testStringRef])
  return (
    <Box
      overflow='hidden'
      style={wrapper}
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
    >
      <Box>
        {damageValues.map((dp, i) => (
          <>
            {!damageDone && (
              <AnimatedNumber
                height='64px'
                padding='0 8px'
                style={{
                  opacity: dp.opacity,
                  lineHeight: '64px',
                  fontSize: '64px',
                  fontWeight: 'bolder',
                  color: 'rgba(255,255,255,0.36)',
                }}
                value={dp.damage}
              />
            )}
            {damageDone && (
              <AnimatedNumber
                height='64px'
                padding='0 8px'
                style={{
                  ...damageAfter,
                  lineHeight: '64px',
                  fontSize: '64px',
                  fontWeight: 'bolder',
                }}
                value={dp.damage}
              />
            )}
            {/*<Box overflow='hidden' style={extraSlide}></Box>*/}
          </>
        ))}
      </Box>
    </Box>
  )
}
