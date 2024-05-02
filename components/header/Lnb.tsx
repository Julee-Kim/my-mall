'use client'

import { Category, FromClickType } from '@/types/product'
import { menuList } from '@/constants/products'
import CategoryList from './CategoryList'
import styles from './Lnb.module.scss'

const Lnb = ({
  selectedTopId,
  selectedSubId,
  subList,
  handleClick,
}: {
  selectedTopId: string
  selectedSubId: string
  subList: Category[]
  handleClick: (category: Category, from: FromClickType) => void
}) => {
  return (
    <div className={styles.snbContainer}>
      <div className={styles.snbInner}>
        <CategoryList
          categories={menuList}
          activeId={selectedTopId}
          isTop={true}
          handleClick={handleClick}
        />
        <CategoryList
          categories={subList}
          activeId={selectedSubId}
          isTop={false}
          handleClick={handleClick}
        />
      </div>
    </div>
  )
}

export default Lnb
