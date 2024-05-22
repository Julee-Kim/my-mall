import styles from './Checkbox.module.scss'
import { ReactNode } from 'react'

interface ICheckboxProps {
  checked?: boolean
  disabled?: boolean
  onChange?: () => void
  children?: ReactNode
}

const Checkbox = ({ checked = false, disabled = false, onChange, children }: ICheckboxProps) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        defaultChecked={checked}
        disabled={disabled}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxIcon} />
      {children && <span className={styles.checkboxText}>{children}</span>}
    </label>
  )
}

export default Checkbox
