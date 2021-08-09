import { useState } from 'react'

export const useList = <T>(
  count: number,
  defaultValue: T,
): [T[], (index: number, value: T) => void] => {
  const [list, setList] = useState<T[]>(Array(count).fill(defaultValue))
  const set = (index: number, value: T) =>
    setList((_list) => _list.map((v, i) => (i === index ? value : v)))
  return [list, set]
}
