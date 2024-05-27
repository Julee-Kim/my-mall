import { ICategory, ICategoryListProps } from '@/types/product'
import styles from '@/components/header/lnb/categoryList/CategoryList.module.scss'

const CategoryList = ({ categories, activeId, isTop, handleClick }: ICategoryListProps) => {
  return (
    <ul className={[styles.list, !isTop ? styles.bgGrey : ''].join(' ')}>
      {categories.map((category: ICategory) => (
        <li key={category.id}>
          <button
            className={[styles.btn, activeId === category.id ? styles.btnActive : ''].join(' ')}
            onClick={() => handleClick(category)}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
