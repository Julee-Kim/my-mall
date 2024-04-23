import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import styles from './Button.module.scss'

const HTMLTypes = ['submit', 'button', 'reset'] as const
export type HTMLType = (typeof HTMLTypes)[number]

const shapes = ['default', 'circle'] as const
type Shape = (typeof shapes)[number]

interface IButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children?: string
  shape?: Shape
  isRightIcon?: boolean
  icon?: ReactNode
  htmlType?: HTMLType
  style?: CSSProperties
  onClick?: () => void
}

export default function Button({
  htmlType = 'button',
  shape = 'default',
  isRightIcon = true,
  icon,
  children,
  style = {},
  onClick,
}: IButtonProps) {
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
      className={[styles.btn, shape].join(' ')}
      style={style}
      onClick={onClick}
    >
      {btnContent}
    </button>
  )
}
