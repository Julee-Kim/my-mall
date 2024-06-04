import menuBarStyles from '@/components/tabs/Tabs.module.scss'
import styles from '@/components/header/skeletonMenuBer/SkeletonMenuBer.module.scss'

const SkeletonMenuBer = () => {
  return (
    <div className={menuBarStyles.TabsWrap}>
      <ul>
        {[...Array(4)].map((index: number) => (
          <li key={index} className={menuBarStyles.tab}>
            <button className={menuBarStyles.tabBtn}>
              <span className={styles.skText}></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkeletonMenuBer
