import { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react'
import styles from './Button.module.scss'

export type HTMLType = 'submit' | 'button' | 'reset'
type Shape = 'default' | 'circle'

interface IButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  htmlType?: HTMLType
  shape?: Shape
  isRightIcon?: boolean
  icon?: ReactNode
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

/**
 * 버튼 컴포넌트
 * @param htmlType html 타입
 * @param shape 버튼 모양
 * @param isRightIcon 우측 아이콘 위치 여부
 * @param icon 아이콘 ui
 * @param style css 스타일
 * @param className 클래스명
 * @param onClick
 * @param children
 * */
const Button = ({
  htmlType = 'button',
  shape = 'default',
  isRightIcon = true,
  icon,
  style = {},
  className = '',
  onClick,
  children,
}: IButtonProps) => {
  return (
    <button
      type={htmlType}
      className={[styles.btn, shape, className].join(' ')}
      style={style}
      onClick={onClick}
    >
      {!isRightIcon && icon}
      {children && <span>{children}</span>}
      {isRightIcon && icon}
    </button>
  )
}

export default Button
