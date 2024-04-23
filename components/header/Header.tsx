import { ReactNode } from 'react'
import styles from './Header.module.scss'

interface IHeaderProps {
  children: ReactNode
}

export default function Header({ children }: IHeaderProps) {
  return <header className={styles.header}>{children}</header>
}
