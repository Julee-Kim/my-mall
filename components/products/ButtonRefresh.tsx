import React from 'react'
import Image from 'next/image'
import Button from '@/components/_common/button/Button'
import IconRefreshImg from '@/public/images/icon/icon-refresh.svg'

const ButtonRefresh = ({ onClick }: { onClick: () => void }) => {
  const IconRefresh = () => <Image src={IconRefreshImg} alt={'초기화'} />

  return <Button icon={<IconRefresh />} style={{ height: '31px' }} onClick={onClick} />
}

export default ButtonRefresh
