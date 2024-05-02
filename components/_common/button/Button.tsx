import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import styles from './Button.module.scss'

export type HTMLType = 'submit' | 'button' | 'reset'
type Shape = 'default' | 'circle'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string
  shape?: Shape
  isRightIcon?: boolean
  icon?: ReactNode
  htmlType?: HTMLType
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

const Button = ({
  htmlType = 'button',
  shape = 'default',
  isRightIcon = true,
  icon,
  children,
  style = {},
  className = '',
  onClick,
}: IButtonProps) => {
  let btnContent: ReactNode = null

  if (icon) {
    if (isRightIcon) {
      btnContent = (
        <>
          {children && <span>{children}</span>}
          {icon}
        </>
      )
    } else {
      btnContent = (
        <>
          {icon}
          {children && <span>{children}</span>}
        </>
      )
    }
  } else {
    btnContent = children
  }

  return (
    <button
      type={htmlType}
      className={[styles.btn, shape, className].join(' ')}
      style={style}
      onClick={onClick}
    >
      {btnContent}
    </button>
  )
}

export default Button
