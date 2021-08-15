import { createContext, PropsWithChildren, useContext, useState } from 'react'

type Log = JSX.Element | string

export type LogsContextValue = {
  push: (log: Log) => void
  logs: Log[]
}

const defaultValue: LogsContextValue = {
  push: () => {},
  logs: [],
}

export const LogsContext = createContext(defaultValue)
export const useLogs = () => useContext(LogsContext)

export const LogsContextProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const [logs, set] = useState<Log[]>([])
  const push = (log: Log) => set((list) => [...list, log])
  const context: LogsContextValue = {
    logs,
    push,
  }

  return <LogsContext.Provider value={context}>{children}</LogsContext.Provider>
}
