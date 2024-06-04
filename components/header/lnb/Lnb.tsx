import { ISubCategoryListItem, ITopCategoryListItem } from '@/types/category'
import CategoryList from '@/components/header/lnb/categoryList/CategoryList'
import styles from './Lnb.module.scss'

const Lnb = ({
  selectedTopId,
  selectedSubId,
  topList,
  subList,
  handleClickTop,
  handleClickSub,
}: {
  selectedTopId: string
  selectedSubId: string
  topList: ITopCategoryListItem[]
  subList: ISubCategoryListItem[]
  handleClickTop: (category: ITopCategoryListItem) => void
  handleClickSub: (category: ISubCategoryListItem) => void
}) => {
  return (
    <div className={styles.snbContainer}>
      <div className={styles.snbInner}>
        {/* TODO. handleClick 타입 에러 */}
        <CategoryList
          categories={topList}
          activeId={selectedTopId}
          isTop={true}
          handleClick={handleClickTop}
        />
        <CategoryList
          categories={subList}
          activeId={selectedSubId}
          isTop={false}
          handleClick={handleClickSub}
        />
      </div>
    </div>
  )
}

export default Lnb
