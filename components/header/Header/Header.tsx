import { HTMLAttributes } from 'react'
import styles from './Header.module.scss'

interface IHeaderProps extends Pick<HTMLAttributes<HTMLElement>, 'children'> {}

const Header = ({ children }: IHeaderProps) => {
  return <header className={styles.header}>{children}</header>
}

export default Header
