import { BsBag } from 'react-icons/bs'
import Link from 'next/link'

const ButtonCart = () => {
  return (
    <Link
      href={''}
      style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <BsBag size={20} />
    </Link>
  )
}

export default ButtonCart
