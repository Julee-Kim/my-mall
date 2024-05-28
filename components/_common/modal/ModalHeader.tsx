import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { useModalContext } from '@/components/_common/modal/Modal'
import styles from '@/components/_common/modal/Modal.module.scss'

const ModalHeader = ({ children }: { children?: string }) => {
  const { onCancel, useClose } = useModalContext()

  return (
    <div className={styles.modalHeader}>
      <h3>{children}</h3>
      {useClose && (
        <button className={styles.btnClose} onClick={onCancel}>
          <IoCloseOutline size={20} />
        </button>
      )}
    </div>
  )
}

export default ModalHeader
