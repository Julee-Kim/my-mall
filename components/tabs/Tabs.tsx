import { ITab } from '@/types/product'
import styles from '@/components/tabs/Tabs.module.scss'

const Tabs = ({
  selectedId,
  tabList,
  handleClick,
}: {
  selectedId: string
  tabList: ITab<typeof selectedId>[]
  handleClick: (tab: ITab<typeof selectedId>) => void
}) => {
  return (
    <div className={styles.TabsWrap}>
      <ul>
        {tabList.map((tab: ITab<typeof selectedId>) => (
          <li key={tab.id} className={styles.tab}>
            <button
              className={[styles.tabBtn, selectedId === tab.id ? styles.active : ''].join(' ')}
              onClick={() => handleClick(tab)}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tabs
