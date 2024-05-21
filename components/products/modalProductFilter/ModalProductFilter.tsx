'use client'

import React, { useEffect, useState } from 'react'
import {
  TFilterKey,
  IModalProductFilterProps,
  IFilterColor,
  IFilterPrice,
  IFilterDiscountBenefit,
  IFilterBrand,
} from '@/types/filter'
import { ITab } from '@/types/product'
import { Modal } from '@/components/_common/modal/Modal'
import Tabs from '@/components/tabs/Tabs'
import ColorContent from '@/components/products/modalProductFilter/filterContents/ColorContent'
import PriceContent from '@/components/products/modalProductFilter/filterContents/PriceContent'
import DiscountBenefitContent from '@/components/products/modalProductFilter/filterContents/DiscountBenefitContent'
import BrandContent from '@/components/products/modalProductFilter/filterContents/BrandContent'
import {
  initialFilterBrand,
  initialFilterColor,
  initialFilterDiscountBenefit,
  initialFilterPrice,
} from '@/constants/filter'

const ModalProductFilter = ({
  isOpen,
  onOk,
  onCancel,
  filterData,
  tab,
}: IModalProductFilterProps) => {
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
    let tabArr: ITab<TFilterKey>[] = []
    Object.keys(filterData).forEach((key) => {
      const filterKey = key as TFilterKey
      const filter = filterData[filterKey]
      tabArr.push({ id: filterKey, name: filter.name })

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
          break
      }
    })
    setTabList([...tabArr])
  }, [])

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
        <Modal.Content>{CurrentContent(selectedTab)}</Modal.Content>
      </Modal>
    </div>
  )
}

export default ModalProductFilter
