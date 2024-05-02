import Image from 'next/image'
import Button from '@/components/_common/button/Button'
import styles from './Header.module.scss'
import IconArrowBottomImg from '@/public/images/icon/icon-arrow-bottom-black.svg'

const ButtonCategoryTitle = ({ name, showSub }: { name: string; showSub: () => void }) => {
  const IconArrowBottom = () => (
    <Image src={IconArrowBottomImg} alt={'카테고리 열기'} style={{ marginLeft: '7px' }} />
  )

  return (
    <h1 className={styles.btnCategoryTitle}>
      <Button icon={<IconArrowBottom />} onClick={showSub}>
        {name}
      </Button>
    </h1>
  )
}

export default ButtonCategoryTitle
