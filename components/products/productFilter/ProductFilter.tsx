'use client'

import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IFilters, IFilterValue, TFilterKey } from '@/types/filter'
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

  const btnText = (filter: IFilterValue) => {
    let btnText = ''

    if (filter.isActive) {
      if (filter.code === 'price') {
        if ('selectedRange' in filter) {
          const { min, max } = filter.selectedRange
          const minPrice = min ? min : ''
          const maxPrice = max ? max : ''
          btnText = minPrice + '~' + maxPrice
        }
      } else {
        if ('selectedList' in filter) {
          const selectedList = filter.selectedList ?? []

          btnText = selectedList[0]?.name
          if (selectedList.length > 1) {
            btnText += ` 외${selectedList.length - 1}`
          }
        }
      }
    } else {
      btnText = filter.name
    }
    return btnText
  }

  return (
    <>
      <div className={styles.filterWrap}>
        <div className={styles.btnRefreshWrap}>
          <ButtonRefresh onClick={handleRefresh} />
        </div>
        <ul className={styles.filter}>
          {Object.keys(filterData).map((filterKey, index) => (
            <li key={index} className={styles.filterItem}>
              <ProductFilterBtn
                isActive={filterData[filterKey as TFilterKey].isActive}
                btnText={btnText(filterData[filterKey as TFilterKey])}
                onClick={() => handleFilterBtn(filterData[filterKey as TFilterKey].code)}
                icon={
                  <IoIosArrowDown
                    color={'rgb(158, 158, 158)'}
                    size={12}
                    style={{ marginLeft: '2px' }}
                  />
                }
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
