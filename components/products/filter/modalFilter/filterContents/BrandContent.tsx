import { useState } from 'react'
import { BRAND_TAB_LIST } from '@/constants/filter'
import { TBrandTabs, IBrandContentProps, IFilterDataBrandItem } from '@/types/filter'
import { comma } from '@/utils'
import SearchBrand from '@/components/products/filter/modalFilter/filterContents/SearchBrand'
import Checkbox from '@/components/_common/checkbox/Checkbox'
import styles from '@/components/products/filter/modalFilter/filterContents/BrandContent.module.scss'

const BrandContent = ({ filterData, onAdd, onDelete }: IBrandContentProps) => {
  const [activeTab, setActiveTab] = useState<TBrandTabs>('top')
  const [keyword, setKeyword] = useState('')

  const getFilteredData = (): IFilterDataBrandItem[] => {
    let dataToFilter = filterData[activeTab]

    // 탭이 전체(all) 일 경우, keyword 포함된 브랜드만 노출
    if (activeTab === 'all' && keyword) {
      const lowerKeyword = keyword.toLowerCase()
      dataToFilter = filterData[activeTab].filter((item: IFilterDataBrandItem) => {
        return (
          item.name.toLowerCase().includes(lowerKeyword) ||
          item.eng_name.toLowerCase().includes(lowerKeyword)
        )
      })
    }

    return dataToFilter
  }

  const filteredData = getFilteredData()

  return (
    <div>
      <div className={styles.tabs}>
        {BRAND_TAB_LIST.map((tab) => (
          <button
            key={tab.type}
            className={[styles.tab, tab.type === activeTab ? styles.activeTab : ''].join(' ')}
            onClick={() => setActiveTab(tab.type)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'all' && (
          <SearchBrand searchKeyword={keyword} onSorting={(value: string) => setKeyword(value)} />
        )}
        <ul className={styles.brandList}>
          {filteredData.map((item: IFilterDataBrandItem) => (
            <li key={item.code} className={styles.brand}>
              <Checkbox
                checked={item.isActive}
                onChange={(e) => {
                  e.target.checked ? onAdd(item.type, item) : onDelete(item.type, item.code)
                }}
              >
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
