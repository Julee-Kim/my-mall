'use client'

import { Category, CategoryListProps } from '@/types/category'
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
            onClick={() => handleClick(category)}
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
  handleClickBtn,
}: {
  selectedTopId: string
  selectedSubId: string
  subList: Category[]
  handleClickBtn: (category: Category) => void
}) {
  return (
    <div className={styles.snbContainer}>
      <div className={styles.snbInner}>
        <CategoryList
          categories={menuList}
          activeId={selectedTopId}
          isTop={true}
          handleClick={handleClickBtn}
        />
        <CategoryList
          categories={subList}
          activeId={selectedSubId}
          isTop={false}
          handleClick={handleClickBtn}
        />
      </div>
    </div>
  )
}
