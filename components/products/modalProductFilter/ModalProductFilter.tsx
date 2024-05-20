'use client'

import React, { useEffect, useState } from 'react'
import {
  TFilterKey,
  TModalProductFilterContentView,
  IModalProductFilterProps,
} from '@/types/filter'
import { ITab } from '@/types/product'
import { Modal } from '@/components/_common/modal/Modal'
import Tabs from '@/components/tabs/Tabs'
import ColorContent from '@/components/products/modalProductFilter/filterContents/ColorContent'
import PriceContent from '@/components/products/modalProductFilter/filterContents/PriceContent'
import DiscountBenefitContent from '@/components/products/modalProductFilter/filterContents/DiscountBenefitContent'
import BrandContent from '@/components/products/modalProductFilter/filterContents/BrandContent'

const ContentViews: TModalProductFilterContentView = {
  color: <ColorContent />,
  price: <PriceContent />,
  discountBenefit: <DiscountBenefitContent />,
  brand: <BrandContent />,
}

const ModalProductFilter = ({
  isOpen,
  onOk,
  onCancel,
  filterData,
  tab,
}: IModalProductFilterProps) => {
  const [selectedTab, setSelectedTap] = useState<TFilterKey>('color')
  const [tabList, setTabList] = useState<ITab<TFilterKey>[]>([])

  useEffect(() => {
    setSelectedTap(tab)
  }, [tab])

  useEffect(() => {
    let arr: ITab<TFilterKey>[] = []
    Object.keys(filterData).forEach((key) => {
      const filterKey = key as TFilterKey
      const filter = filterData[filterKey]
      arr.push({ id: filterKey, name: filter.name })
    })
    setTabList(arr)
  }, [])

  const CurrentContent = () => {
    return ContentViews[selectedTab]
  }

  const handleClick = (tab: ITab<TFilterKey>) => {
    setSelectedTap(tab.id)
  }

  return (
    <div>
      <Modal isOpen={isOpen} onCancel={onCancel}>
        <Modal.Header>
          <Tabs selectedId={selectedTab} tabList={tabList} handleClick={handleClick} />
        </Modal.Header>
        <Modal.Content>
          <CurrentContent />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ModalProductFilter
