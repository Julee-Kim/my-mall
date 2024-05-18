import Image from 'next/image'
import Button from '@/components/_common/button/Button'
import IconBackImg from '@/public/images/icon/icon-back.svg'

const ButtonBack = () => {
  const IconBack = () => <Image src={IconBackImg} alt={'이전 페이지'} />

  return <Button icon={<IconBack />} style={{ height: '32px' }} />
}

export default ButtonBack
