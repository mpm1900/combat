import { PropsWithChildren } from 'react'
import { CombatSystem } from './CombatSystemContext'
import { LogsContextProvider } from './LogsContext'
import { ModalContextProvider } from './ModalContext'

export const AppContexts = (props: PropsWithChildren<{}>) => {
  const { children } = props
  return (
    <LogsContextProvider>
      <CombatSystem>
        <ModalContextProvider>{children}</ModalContextProvider>
      </CombatSystem>
    </LogsContextProvider>
  )
}
