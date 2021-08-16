import { PropsWithChildren } from 'react'
import { CombatSystem } from './CombatSystemContext'
import { LogsContextProvider } from './LogsContext'
import { ModalContextProvider } from './ModalContext'
import { PlayerContextProvider } from './PlayerContext'

export const AppContexts = (props: PropsWithChildren<{}>) => {
  const { children } = props
  return (
    <LogsContextProvider>
      <PlayerContextProvider>
        <CombatSystem>
          <ModalContextProvider>{children}</ModalContextProvider>
        </CombatSystem>
      </PlayerContextProvider>
    </LogsContextProvider>
  )
}
