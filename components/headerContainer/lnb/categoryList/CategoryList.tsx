import { ICategoryListProps, ISubCategoryListItem, ITopCategoryListItem } from '@/types/category'
import styles from '@/components/headerContainer/lnb/categoryList/CategoryList.module.scss'

const CategoryList = ({ categories, activeId, isTop, handleClick }: ICategoryListProps) => {
  return (
    <ul className={[styles.list, !isTop ? styles.bgGrey : ''].join(' ')}>
      {categories.map((category: ITopCategoryListItem | ISubCategoryListItem) => (
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
