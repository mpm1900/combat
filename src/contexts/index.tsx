import { PropsWithChildren } from 'react'
import { CombatSystem } from './CombatSystemContext'
import { LogsContextProvider } from './LogsContext'
import { ModalContextProvider } from './ModalContext'
import { PartySystem } from './PartySystemContext'
import { PlayerContextProvider } from './PlayerContext'

export const AppContexts = (props: PropsWithChildren<{}>) => {
  const { children } = props
  return (
    <LogsContextProvider>
      <PlayerContextProvider>
        <PartySystem>
          <CombatSystem>
            <ModalContextProvider>{children}</ModalContextProvider>
          </CombatSystem>
        </PartySystem>
      </PlayerContextProvider>
    </LogsContextProvider>
  )
}
