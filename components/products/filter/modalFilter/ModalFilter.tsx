'use client'

import React, { useEffect, useState } from 'react'
import {
  TFilterKey,
  IModalProductFilterProps,
  IFilterColor,
  IFilterPrice,
  IFilterDiscountBenefit,
  IFilterBrand,
  IFilterValue,
} from '@/types/filter'
import { ITab } from '@/types/product'
import {
  filters,
  initialFilterBrand,
  initialFilterColor,
  initialFilterDiscountBenefit,
  initialFilterPrice,
} from '@/constants/filter'
import { Modal } from '@/components/_common/modal/Modal'
import Tabs from '@/components/tabs/Tabs'
import ColorContent from '@/components/products/filter/modalFilter/filterContents/ColorContent'
import PriceContent from '@/components/products/filter/modalFilter/filterContents/PriceContent'
import DiscountBenefitContent from '@/components/products/filter/modalFilter/filterContents/DiscountBenefitContent'
import BrandContent from '@/components/products/filter/modalFilter/filterContents/BrandContent'
import ModalFilterSelectedList from '@/components/products/filter/modalFilter/ModalFilterSelectedList'
import styles from './ModalFilter.module.scss'
import ModalFilterFooter from '@/components/products/filter/modalFilter/ModalFilterFooter'

const ModalFilter = ({ isOpen, onOk, onCancel, filterData, tab }: IModalProductFilterProps) => {
  const [selectedTab, setSelectedTab] = useState<TFilterKey>('color')
  const [tabList, setTabList] = useState<ITab<TFilterKey>[]>([])
  const [filterColor, setFilterColor] = useState<IFilterColor>(initialFilterColor)
  const [filterPrice, setFilterPrice] = useState<IFilterPrice>(initialFilterPrice)
  const [filterDiscountBenefit, setFilterDiscountBenefit] = useState<IFilterDiscountBenefit>(
    initialFilterDiscountBenefit,
  )
  const [filterBrand, setFilterBrand] = useState<IFilterBrand>(initialFilterBrand)

  useEffect(() => {
    setSelectedTab(tab)
  }, [tab])

  useEffect(() => {
    const tabArr: ITab<TFilterKey>[] = Object.keys(filterData).map((key) => {
      const filterKey = key as TFilterKey
      const filter = filterData[filterKey]

      setFilterData(filterKey, filter)

      return { id: filterKey, name: filter.name }
    })
    setTabList(tabArr)
  }, [])

  const setFilterData = (filterKey: TFilterKey, filter: IFilterValue) => {
    switch (filterKey) {
      case 'color':
        setFilterColor(filter as IFilterColor)
        break
      case 'price':
        setFilterPrice(filter as IFilterPrice)
        break
      case 'discountBenefit':
        setFilterDiscountBenefit(filter as IFilterDiscountBenefit)
        break
      case 'brand':
        setFilterBrand(filter as IFilterBrand)
        break
      default:
        return null
    }
  }

  const CurrentContent = (tab: TFilterKey) => {
    switch (tab) {
      case 'color':
        return <ColorContent filterData={filterColor} />
      case 'price':
        return <PriceContent filterData={filterPrice} />
      case 'discountBenefit':
        return <DiscountBenefitContent filterData={filterDiscountBenefit} />
      case 'brand':
        return <BrandContent filterData={filterBrand} />
      default:
        return null
    }
  }

  const handleClick = (tab: ITab<TFilterKey>) => {
    setSelectedTab(tab.id)
  }

  return (
    <div>
      <Modal isOpen={isOpen} onCancel={onCancel}>
        <Modal.Header>
          <Tabs selectedId={selectedTab} tabList={tabList} handleClick={handleClick} />
        </Modal.Header>
        <Modal.Content>
          <div className={styles.filterContent}>{CurrentContent(selectedTab)}</div>
          <ModalFilterSelectedList filterData={filters} />
          <ModalFilterFooter />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ModalFilter
