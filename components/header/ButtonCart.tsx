import Link from 'next/link'
import Image from 'next/image'
import IconCartImg from '@/public/images/icon/icon-cart.svg'
import styles from './Header.module.scss'

export default function ButtonCart() {
  return (
    <Link href={''} className={styles.linkCart}>
      <Image src={IconCartImg} alt={'장바구니'} />
    </Link>
  )
}
