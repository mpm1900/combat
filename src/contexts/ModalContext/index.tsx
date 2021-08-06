import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react'
import { ModalContextWrapper, ModalNodeWrapper } from './style'

export type ModalContextValue = {
  open: <T>(Component: FunctionComponent<T>, props: T) => void
  close: () => void
}
const defaultValue: ModalContextValue = {
  open: () => {},
  close: () => {},
}

export const ModalContext = createContext<ModalContextValue>(defaultValue)
export const useModal = () => useContext(ModalContext)

export const ModalContextProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const [isOpen, setIsOpen] = useState(false)
  const componentProps = useRef<any>({})
  const componentRef = useRef<FunctionComponent<any> | null>(null)
  const Component = componentRef.current
  const context: ModalContextValue = {
    open: (c, p) => {
      componentRef.current = c
      componentProps.current = p
      setIsOpen(true)
    },
    close: () => {
      componentRef.current = null
      componentProps.current = null
      setIsOpen(false)
    },
  }
  return (
    <ModalContext.Provider value={context}>
      <ModalContextWrapper>
        {children}
        {isOpen && Component && (
          <ModalNodeWrapper onClick={context.close}>
            <Component {...(componentProps || {})} />
          </ModalNodeWrapper>
        )}
      </ModalContextWrapper>
    </ModalContext.Provider>
  )
}
