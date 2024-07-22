import { IFilterBarListItem } from '@/types/filter'
import styles from '@/components/products/filter/modalFilter/tabs/Tabs.module.scss'

const Tabs = ({
  activeId,
  tabList,
  onClickTab,
}: {
  activeId: string
  tabList: IFilterBarListItem[]
  onClickTab: (tab: IFilterBarListItem) => void
}) => {
  return (
    <div className={styles.tabsWrap}>
      <ul>
        {tabList.map((tab: IFilterBarListItem) => (
          <li key={tab.code} className={styles.tab}>
            <button
              className={[styles.tabBtn, activeId === tab.code ? styles.active : ''].join(' ')}
              onClick={() => onClickTab(tab)}
            >
              <span className={tab.isActive ? styles.dot : ''}>{tab.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tabs
