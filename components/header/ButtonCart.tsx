import Link from 'next/link'
import Image from 'next/image'
import IconCartImg from '@/public/images/icon/icon-cart.svg'

const ButtonCart = () => {
  return (
    <Link href={''} style={{ height: '32px' }}>
      <Image src={IconCartImg} alt={'장바구니'} />
    </Link>
  )
}

export default ButtonCart
