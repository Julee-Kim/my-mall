'use client'

import { HTMLAttributes, ReactNode, useEffect, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import ModalHeader from '@/components/_common/modal/ModalHeader'
import styles from './Modal.module.scss'

interface IModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onCancel: () => void
  useClose?: boolean
  children: ReactNode
}

const ModalContext = createContext({
  useClose: true,
  onCancel: () => {},
})

export const useModalContext = () => useContext(ModalContext)

// TODO. onCancel ts 에러 해결
export const ModalContainer = ({ isOpen, onCancel, useClose = false, children }: IModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('noScroll')
    } else {
      document.body.classList.remove('noScroll')
    }
  }, [isOpen])

  if (!isOpen) return null

  const value = {
    onCancel,
    useClose,
  }

  return createPortal(
    <ModalContext.Provider value={value}>
      <div className={[styles.modalContainer, isOpen ? styles.openContainer : ''].join(' ')}>
        <div className={styles.dimmed} onClick={onCancel} />
        <div className={[styles.modal, isOpen ? styles.open : ''].join(' ')}>{children}</div>
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
