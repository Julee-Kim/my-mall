import { ReactNode } from 'react'
import { useModalContext } from '@/components/_common/modal/Modal'
import styles from '@/components/_common/modal/Modal.module.scss'

const ModalHeader = ({ children }: { children?: ReactNode }) => {
  const { onCancel, useClose } = useModalContext()

  return (
    <div className={styles.modalHeader}>
      <h3>{children}</h3>
      {useClose ? (
        <button className={styles.btnClose} onClick={onCancel}>
          x
        </button>
      ) : null}
    </div>
  )
}

export default ModalHeader
