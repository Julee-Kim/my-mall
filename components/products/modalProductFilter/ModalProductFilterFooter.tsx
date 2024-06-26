import { comma } from '@/utils'
import Button from '@/components/_common/button/Button'
import styles from '@/components/products/modalProductFilter/ModalProductFilter.module.scss'

const ModalProductFilterFooter = () => {
  return (
    <div className={styles.filterFooter}>
      <Button className={[styles.btn, styles.close].join(' ')}>취소</Button>
      <Button className={[styles.btn, styles.submit].join(' ')}>{comma(3450)}개 상품보기</Button>
    </div>
  )
}

export default ModalProductFilterFooter
