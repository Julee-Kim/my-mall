import Image from 'next/image'
import Button from '@/components/_common/button/Button'
import IconBackImg from '@/public/images/icon/icon-back.svg'

const IconBack = () => {
  return <Image src={IconBackImg} alt={'이전 페이지'} />
}

export default function ButtonBack() {
  return <Button icon={<IconBack />} style={{ height: '32px' }} />
}
