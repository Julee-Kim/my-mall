'use client'

import { HTMLAttributes, ReactNode, useEffect, useState, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import ModalHeader from '@/components/_common/modal/ModalHeader'
import styles from './Modal.module.scss'

interface IModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onCancel: () => void
  useClose?: boolean
  useAni?: boolean // 애니메이션 사용 여부
  children: ReactNode
}

const ModalContext = createContext({
  useClose: true,
  onCancel: () => {},
})

export const useModalContext = () => useContext(ModalContext)

// TODO. onCancel ts 에러 해결
export const ModalContainer = ({
  isOpen,
  onCancel,
  useClose = false,
  useAni = true,
  children,
}: IModalProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      document.body.classList.add('noScroll')
    } else {
      document.body.classList.remove('noScroll')
      if (!useAni) {
        setShouldRender(false)
      }
    }
  }, [isOpen, useAni])

  const onAnimationEnd = () => {
    if (!isOpen) setShouldRender(false)
  }
  if (!shouldRender) return null

  const value = {
    onCancel,
    useClose,
  }

  return createPortal(
    <ModalContext.Provider value={value}>
      <div
        className={[
          styles.modalContainer,
          isOpen ? (useAni ? styles.openContainer : '') : useAni ? styles.closeContainer : '',
        ].join(' ')}
        onAnimationEnd={useAni ? onAnimationEnd : undefined}
      >
        <div className={styles.dimmed} onClick={onCancel} />
        <div
          className={[
            styles.modal,
            isOpen ? (useAni ? styles.open : '') : useAni ? styles.close : '',
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body,
  )
}

const ModalContent = ({ children }: { children: ReactNode }) => <div>{children}</div>

export const Modal = Object.assign(ModalContainer, {
  Header: ModalHeader,
  Content: ModalContent,
})
