'use client'

import { Category, CategoryListProps, FromClickType } from '@/types/product'
import { menuList } from '@/constants/products'
import styles from './Lnb.module.scss'

const CategoryList = ({ categories, activeId, isTop, handleClick }: CategoryListProps) => {
  return (
    <ul className={[styles.list, !isTop ? styles.bgGray : ''].join(' ')}>
      {categories.map((category: Category) => (
        <li key={category.id}>
          <button
            className={[styles.btn, activeId === category.id ? styles.btnActive : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => handleClick(category, 'lnb')}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function Lnb({
  selectedTopId,
  selectedSubId,
  subList,
  handleClick,
}: {
  selectedTopId: string
  selectedSubId: string
  subList: Category[]
  handleClick: (category: Category, from: FromClickType) => void
}) {
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
