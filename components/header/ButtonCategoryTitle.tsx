import Image from 'next/image'
import Button from '@/components/_common/button/Button'
import IconArrowBottomImg from '@/public/images/icon/icon-arrow-bottom-black.svg'
import styles from './Header.module.scss'

const IconArrowBottom = () => {
  return <Image src={IconArrowBottomImg} alt={'카테고리 열기'} style={{ marginLeft: '7px' }} />
}

export default function ButtonCategoryTitle() {
  return (
    <h1 className={styles.btnCategoryTitle}>
      <Button icon={<IconArrowBottom />}>의류</Button>
    </h1>
  )
}
