import { ICategory, TFromClickType } from '@/types/product'
import styles from '@/components/header/SnbMenu/SubMenu.module.scss'

const SubMenu = ({
  selectedSubId,
  subList,
  handleClick,
}: {
  selectedSubId: string
  subList: ICategory[]
  handleClick: (category: ICategory, from: TFromClickType) => void
}) => {
  return (
    <div className={styles.subMenuWrap}>
      <ul>
        {subList.map((sub: ICategory) => (
          <li key={sub.id} className={styles.sub}>
            <button
              className={[styles.btn, selectedSubId === sub.id ? styles.btnActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleClick(sub, 'subMenu')}
            >
              {sub.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SubMenu
