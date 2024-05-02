import { Category, CategoryListProps } from '@/types/product'
import styles from '@/components/header/CategoryList/CategoryList.module.scss'

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

export default CategoryList
