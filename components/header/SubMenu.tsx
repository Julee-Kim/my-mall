import { Category, FromClickType } from '@/types/category'
import styles from '@/components/header/SubMenu.module.scss'

export default function SubMenu({
  selectedSubId,
  subList,
  handleClick,
}: {
  selectedSubId: string
  subList: Category[]
  handleClick: (category: Category, from: FromClickType) => void
}) {
  return (
    <div className={styles.subMenuWrap}>
      <ul>
        {subList.map((sub: Category) => (
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