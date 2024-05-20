'use client'

import React, { useState } from 'react'
import { IFilters, TFilterKey } from '@/types/filter'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import ProductFilterBtn from '@/components/products/productFilterBtn/ProductFilterBtn'
import ModalProductFilter from '@/components/products/modalProductFilter/ModalProductFilter'
import styles from './ProductFilter.module.scss'

const ProductFilter = ({ filterData }: { filterData: IFilters }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedTab, setSelectedTap] = useState<TFilterKey>('color')

  const handleRefresh = () => {
    console.log('handleRefresh')
  }

  // TODO. tabCode 타입 변경
  const handleFilterBtn = (tabCode: any) => {
    console.log('handleFilterBtn ', tabCode)
    setSelectedTap(tabCode)
    setIsOpen(true)
  }

  const handleOk = () => {
    console.log('handleOk')
    setIsOpen(false)
  }

  const handleCancel = () => {
    console.log('handleCancel')
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.filterWrap}>
        <div className={styles.btnRefreshWrap}>
          <ButtonRefresh onClick={handleRefresh} />
        </div>
        <ul className={styles.filter}>
          {Object.keys(filterData).map((filterKey, index) => (
            <li
              key={index}
              className={[
                styles.filterItem,
                filterData[filterKey as TFilterKey].isActive ? styles.active : '',
              ].join(' ')}
            >
              <ProductFilterBtn
                filter={filterData[filterKey as TFilterKey]}
                onClick={() => handleFilterBtn(filterData[filterKey as TFilterKey].code)}
              />
            </li>
          ))}
        </ul>
      </div>
      <ModalProductFilter
        isOpen={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        filterData={filterData}
        tab={selectedTab}
      />
    </>
  )
}

export default ProductFilter
