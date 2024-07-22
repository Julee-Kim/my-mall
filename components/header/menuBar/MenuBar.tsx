import { ISubCategoryListItem } from '@/types/category'
import styles from '@/components/products/filter/modalFilter/tabs/Tabs.module.scss'

const MenuBar = ({
  selectedId,
  menuList = [],
  handleClick,
}: {
  selectedId: string
  menuList: ISubCategoryListItem[]
  handleClick: (tab: ISubCategoryListItem) => void
}) => {
  return (
    <div className={styles.TabsWrap}>
      <ul>
        {menuList.map((menu: ISubCategoryListItem) => (
          <li key={menu.id} className={styles.tab}>
            <button
              className={[styles.tabBtn, selectedId === menu.id ? styles.active : ''].join(' ')}
              onClick={() => handleClick(menu)}
            >
              {menu.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuBar
