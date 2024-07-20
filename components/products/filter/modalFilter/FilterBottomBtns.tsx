import { comma } from '@/utils'
import Button from '@/components/_common/button/Button'
import styles from '@/components/products/filter/modalFilter/ModalFilter.module.scss'

const FilterBottomBtns = ({
  total,
  onSearch,
  onCancel,
}: {
  total: number
  onSearch: () => void
  onCancel: () => void
}) => {
  return (
    <div className={styles.filterFooter}>
      <Button className={[styles.btn, styles.close].join(' ')} onClick={onCancel}>
        취소
      </Button>
      <Button className={[styles.btn, styles.submit].join(' ')} onClick={onSearch}>
        {comma(total)}개 상품보기
      </Button>
    </div>
  )
}

export default FilterBottomBtns
