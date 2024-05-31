'use client'

import React, { useEffect, useState } from 'react'
import { TFilterKey, IModalProductFilterProps, IFiltersRes } from '@/types/filter'
import { ITab } from '@/types/product'
import { FILTER_CODE, initialFilterData, MODAL_FILTER_TAB_LIST } from '@/constants/filter'
import { fetchFilters } from '@/services/filters'
import { useFilterStore } from '@/store/filter'
import { Modal } from '@/components/_common/modal/Modal'
import Tabs from '@/components/tabs/Tabs'
import ColorContent from '@/components/products/filter/modalFilter/filterContents/ColorContent'
import PriceContent from '@/components/products/filter/modalFilter/filterContents/PriceContent'
import DiscountBenefitContent from '@/components/products/filter/modalFilter/filterContents/DiscountBenefitContent'
import BrandContent from '@/components/products/filter/modalFilter/filterContents/BrandContent'
import SelectedFilterList from '@/components/products/filter/modalFilter/SelectedFilterList'
import FilterBottomBtns from '@/components/products/filter/modalFilter/FilterBottomBtns'
import styles from './ModalFilter.module.scss'

const ModalFilter = ({ isOpen, onOk, onCancel, tab }: IModalProductFilterProps) => {
  const [selectedTab, setSelectedTab] = useState<TFilterKey>(FILTER_CODE.color)
  const [filterData, setFilterData] = useState<IFiltersRes>(initialFilterData)
  const { isActiveColorTab, isActivePriceTab, isActiveDiscountBenefitTab, isActiveBrandTab } =
    useFilterStore()

  useEffect(() => {
    setSelectedTab(tab)
  }, [tab])

  useEffect(() => {
    if (isOpen) {
      ;(async () => {
        const { data } = await fetchFilters()

        setFilterData(data)
      })()
    }
  }, [isOpen])

  const setTabs = () => {
    /**
     * TODO: 나중에 주석 삭제 할 것
     * isDot
     *  - 모달 내의 컬러, 가격, 할인/혜택, 브랜드 탭의 active 표기를 위한 값
     *  - 스토어 값을 할당
     * */
    const tabs: ITab<TFilterKey>[] = MODAL_FILTER_TAB_LIST.map((filter) => {
      switch (filter.code) {
        case FILTER_CODE.color:
          return { id: filter.code, name: filter.name, isDot: isActiveColorTab }
        case FILTER_CODE.price:
          return { id: filter.code, name: filter.name, isDot: isActivePriceTab }
        case FILTER_CODE.discountBenefit:
          return { id: filter.code, name: filter.name, isDot: isActiveDiscountBenefitTab }
        case FILTER_CODE.brand:
          return { id: filter.code, name: filter.name, isDot: isActiveBrandTab }
      }
    })

    return tabs
  }

  const CurrentContent = (tab: TFilterKey) => {
    switch (tab) {
      case FILTER_CODE.color:
        return <ColorContent filterData={filterData.color} />
      case FILTER_CODE.price:
        return <PriceContent filterData={filterData.price} />
      case FILTER_CODE.discountBenefit:
        return (
          <DiscountBenefitContent discount={filterData.discount} benefit={filterData.benefit} />
        )
      case FILTER_CODE.brand:
        return (
          <BrandContent
            filterData={{
              all: filterData.brand,
              top: filterData.topBrand,
              new: filterData.newBrand,
            }}
          />
        )
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
        <Modal.Content>
          <Tabs selectedId={selectedTab} tabList={setTabs()} handleClick={handleClick} />
          <div className={styles.filterContent}>{CurrentContent(selectedTab)}</div>
          <SelectedFilterList />
          <FilterBottomBtns />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ModalFilter
