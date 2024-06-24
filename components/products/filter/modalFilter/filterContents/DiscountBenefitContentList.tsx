import { IDiscountBenefitContentListProps, IFilterDataItem } from '@/types/filter'
import { comma } from '@/utils'
import Checkbox from '@/components/_common/checkbox/Checkbox'
import styles from './DiscountBenefitContentList.module.scss'

const DiscountBenefitContentList = ({
  title,
  filterData,
  onAdd,
  onDelete,
}: IDiscountBenefitContentListProps) => {
  return (
    <div className={styles.listWrap}>
      <h4 className={styles.title}>{title}</h4>
      <ul>
        {filterData.map((item: IFilterDataItem) => (
          <li key={item.code} className={styles.item}>
            <Checkbox
              checked={item.isActive}
              onChange={(e) => {
                e.target.checked ? onAdd(item.type, item) : onDelete(item.type, item.code)
              }}
            >
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
