import { IFilterItem } from '@/types/filter'
import { comma } from '@/utils'
import Checkbox from '@/components/_common/checkbox/Checkbox'
import styles from './DiscountBenefitContentList.module.scss'

const DiscountBenefitContentList = ({
  title,
  filterList,
}: {
  title: string
  filterList: IFilterItem[]
}) => {
  return (
    <div className={styles.listWrap}>
      <h4 className={styles.title}>{title}</h4>
      <ul>
        {filterList.map((item: IFilterItem) => (
          <li key={item.code} className={styles.item}>
            <Checkbox>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.count}>({comma(item.count)})</span>
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DiscountBenefitContentList
