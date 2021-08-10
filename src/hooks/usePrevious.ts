import { useEffect, useRef } from 'react'

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T | undefined>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
