import { useState } from 'react'
import { tabList } from '@/constants/filter'
import { IFilterBrand, TBrandTabs, IFilterBrandItem } from '@/types/filter'
import { comma } from '@/utils'
import SearchBrand from '@/components/products/filter/modalFilter/filterContents/SearchBrand'
import Checkbox from '@/components/_common/checkbox/Checkbox'
import styles from '@/components/products/filter/modalFilter/filterContents/BrandContent.module.scss'

const BrandContent = ({ filterData }: { filterData: IFilterBrand }) => {
  const [activeTab, setActiveTab] = useState<TBrandTabs>('top')

  const handleTab = (tab: TBrandTabs) => {
    setActiveTab(tab)
  }

  return (
    <div>
      <div className={styles.tabs}>
        {tabList.map((tab) => (
          <button
            key={tab.type}
            className={[styles.tab, tab.type === activeTab ? styles.activeTab : ''].join(' ')}
            onClick={() => handleTab(tab.type)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'all' && <SearchBrand />}
        <ul className={styles.brandList}>
          {filterData[activeTab].map((item: IFilterBrandItem) => (
            <li key={item.code} className={styles.brand}>
              <Checkbox>
                <span className={styles.textWrap}>
                  <span className={styles.engName}>{item.eng_name}</span>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.count}>({comma(item.count)})</span>
                  <span className={styles.badge}>단독</span>
                </span>
              </Checkbox>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BrandContent
