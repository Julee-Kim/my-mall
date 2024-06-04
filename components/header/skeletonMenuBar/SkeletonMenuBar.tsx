import menuBarStyles from '@/components/tabs/Tabs.module.scss'
import styles from '@/components/header/SkeletonMenuBar/SkeletonMenuBar.module.scss'

const SkeletonMenuBar = () => {
  return (
    <div className={menuBarStyles.TabsWrap}>
      <ul>
        {Array(4).map((item: number) => (
          <li key={item} className={menuBarStyles.tab}>
            <button className={menuBarStyles.tabBtn}>
              <span className={styles.skText}></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkeletonMenuBar
