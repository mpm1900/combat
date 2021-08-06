import { PropsWithChildren } from 'react'
import { CombatContextProvider } from './CombatContext'
import { ModalContextProvider } from './ModalContext'

export const AppContexts = (props: PropsWithChildren<{}>) => {
  const { children } = props
  return (
    <CombatContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </CombatContextProvider>
  )
}
