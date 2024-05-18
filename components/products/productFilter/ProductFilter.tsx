'use client'

import React from 'react'
import { IFilters, TFilterKey } from '@/types/filter'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import ProductFilterBtn from '@/components/products/productFilterBtn/ProductFilterBtn'
import styles from './ProductFilter.module.scss'

const ProductFilter = ({ filterData }: { filterData: IFilters }) => {
  const handleRefresh = () => {
    console.log('handleRefresh')
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
              <ProductFilterBtn filter={filterData[filterKey as TFilterKey]} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProductFilter
