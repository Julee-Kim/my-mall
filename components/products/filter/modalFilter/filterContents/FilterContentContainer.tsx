'use client'

import React from 'react'
import { IFilterContentContainerProps, TFilterKey } from '@/types/filter'
import { FILTER_CODE } from '@/constants/filter'
import ColorContent from '@/components/products/filter/modalFilter/filterContents/ColorContent'
import PriceContent from '@/components/products/filter/modalFilter/filterContents/PriceContent'
import DiscountBenefitContent from '@/components/products/filter/modalFilter/filterContents/DiscountBenefitContent'
import BrandContent from '@/components/products/filter/modalFilter/filterContents/BrandContent'
import styles from '@/components/products/filter/modalFilter/ModalFilter.module.scss'

const FilterContentContainer = ({
  activeTab,
  filterData,
  onAddFilter,
  onDeleteFilter,
  onPriceFilter,
  isSelectedFilters,
}: IFilterContentContainerProps) => {
  const CurrentContent = (activeTab: TFilterKey) => {
    switch (activeTab) {
      case FILTER_CODE.color:
        return (
          <ColorContent
            filterData={filterData.color}
            onAdd={onAddFilter}
            onDelete={onDeleteFilter}
          />
        )
      case FILTER_CODE.price:
        return <PriceContent filterData={filterData.price} onChange={onPriceFilter} />
      case FILTER_CODE.discountBenefit:
        return (
          <DiscountBenefitContent
            discount={filterData.discount}
            benefit={filterData.benefit}
            onAdd={onAddFilter}
            onDelete={onDeleteFilter}
          />
        )
      case FILTER_CODE.brand:
        return (
          <BrandContent
            filterData={{
              all: filterData.brand,
              top: filterData.topBrand,
              new: filterData.newBrand,
            }}
            onAdd={onAddFilter}
            onDelete={onDeleteFilter}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={[styles.filterContent, isSelectedFilters ? styles.pb20 : ''].join(' ')}>
      {CurrentContent(activeTab)}
    </div>
  )
}

export default FilterContentContainer
