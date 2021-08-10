import { useChain, useSpring, useSpringRef } from '@react-spring/web'
import styled from 'styled-components'
import { ReactComponent as CheckIcon } from '../../../icons/delapouite/dice-target.svg'
import { Icon } from '../Icon'
import { Box, BoxProps } from '../Box'

const Wrapper = styled(Box)((p) => ({
  position: 'relative',
  overflow: 'hidden',
  borderStyle: 'solid',
  boxShadow: '0px 0px 5px rgba(0,0,0,0.5) inset',
}))

const Inner = styled(Box)(() => ({
  boxShadow: '1px 0px 1px rgba(0,0,0,1)',
  zIndex: 2,
}))

export type CheckProps = BoxProps & {
  size: number
  delay?: number
  value: boolean
  isDone?: boolean
  nullColor?: string
  failureColor?: string
  successColor?: string
  backgroundColor?: string
  onRest?: () => void
}

export const Check = (props: CheckProps) => {
  const {
    isDone = false,
    value,
    size,
    padding = '6px',
    borderWidth = '3px',
    margin = '8px',
    delay = 0,
    nullColor = 'rgba(255,255,255,0.09)',
    failureColor = 'rgba(255,255,255,0.18)',
    successColor = 'rgba(255,255,255,1)',
    backgroundColor = 'rgba(255,255,255,0.054)',
    children,
    onRest,
    ...rest
  } = props

  const dropDuration = 300
  const dropRef = useSpringRef()
  const drop = useSpring({
    ref: dropRef,
    from: { top: isDone ? 0 : -size },
    top: 0,
    config: { duration: dropDuration },
    delay: delay,
  })

  const shakeDuration = 100
  const shakeRef = useSpringRef()
  const shake = useSpring({
    ref: shakeRef,
    from: { x: 1 },
    to: { x: isDone ? 1 : 0 },
    config: { duration: shakeDuration },
    delay: delay + dropDuration,
    onRest: () => {
      onRest && onRest()
    },
  })

  const borderRef = useSpringRef()
  const border = useSpring({
    ref: borderRef,
    from: {
      borderColor: nullColor,
    },
    to: {
      borderColor: isDone ? (value ? successColor : failureColor) : nullColor,
    },
  })

  const shadowColor = value ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'
  const shadowValue = isDone
    ? `0px 0px 20px ${shadowColor} inset`
    : `0px 0px 0px ${shadowColor} inset`

  const shadow = useSpring({
    boxShadow: shadowValue,
    backgroundColor: backgroundColor,
  })

  useChain([dropRef, shakeRef, borderRef])
  return (
    <Wrapper
      {...rest}
      height={size}
      width={size}
      borderWidth={borderWidth}
      margin={margin}
      style={{
        ...border,
        transform: shake.x
          .to({
            range: [0, 0.5, 1],
            output: [0, isDone ? 0 : size / 6, 0],
          })
          .to((x) => `translate3d(0px, ${x}px, 0px)`),
      }}
    >
      <Inner
        height={size}
        width={size}
        position='absolute'
        style={{
          ...drop,
          ...shadow,
          fill: border.borderColor,
        }}
      >
        <Icon flex={1} padding={padding}>
          {children || <CheckIcon />}
        </Icon>
      </Inner>
    </Wrapper>
  )
}
