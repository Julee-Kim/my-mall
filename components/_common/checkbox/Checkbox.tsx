import { ChangeEvent, ReactNode } from 'react'
import styles from './Checkbox.module.scss'

interface ICheckboxProps {
  checked?: boolean
  disabled?: boolean
  isShowIcon?: boolean
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  children?: ReactNode
}

const Checkbox = ({
  checked = false,
  disabled = false,
  isShowIcon = true,
  className = '',
  onChange,
  children,
}: ICheckboxProps) => {
  return (
    <label className={[styles.checkbox, className].join(' ')}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      {isShowIcon && <span className={styles.checkboxIcon} />}
      {children && <span className={styles.checkboxText}>{children}</span>}
    </label>
  )
}

export default Checkbox
