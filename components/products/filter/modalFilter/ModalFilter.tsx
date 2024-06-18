'use client'

import React, { useEffect, useState } from 'react'
import {
  IFilterBarListItem,
  IFilterBrandItem,
  IFilterData,
  IFilterItem,
  IModalProductFilterProps,
  ISelectedFilterItem,
  TArgFilterDataItem,
  TFilterItemCode,
  TFilterKey,
  TSelectedFilterItemKey,
} from '@/types/filter'
import { FILTER_BAR_LIST, FILTER_CODE, initialFilterData } from '@/constants/filter'
import { fetchFilters } from '@/services/filters'
import { Modal } from '@/components/_common/modal/Modal'
import Tabs from '@/components/products/filter/modalFilter/tabs/Tabs'
import ColorContent from '@/components/products/filter/modalFilter/filterContents/ColorContent'
import PriceContent from '@/components/products/filter/modalFilter/filterContents/PriceContent'
import DiscountBenefitContent from '@/components/products/filter/modalFilter/filterContents/DiscountBenefitContent'
import BrandContent from '@/components/products/filter/modalFilter/filterContents/BrandContent'
import SelectedFilterList from '@/components/products/filter/modalFilter/SelectedFilterList'
import FilterBottomBtns from '@/components/products/filter/modalFilter/FilterBottomBtns'
import styles from './ModalFilter.module.scss'
import { comma } from '@/utils'

const ModalFilter = ({ isOpen, onOk, onCancel, tab }: IModalProductFilterProps) => {
  const [activeTab, setActiveTab] = useState<TFilterKey>(FILTER_CODE.color)
  const [filterData, setFilterData] = useState<IFilterData>(initialFilterData)
  const [selectedFilterList, setSelectedFilterList] = useState<ISelectedFilterItem[]>([])

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])

  useEffect(() => {
    const fetchFilterData = async () => {
      const { data } = await fetchFilters()

      const color = addPropertiesToListItem(FILTER_CODE.color, data.color)
      const price = { ...filterData.price, ...data.price }
      const discount = addPropertiesToListItem(FILTER_CODE.discount, data.discount)
      const benefit = addPropertiesToListItem(FILTER_CODE.benefit, data.benefit)
      const brand = addPropertiesToListItem(FILTER_CODE.brand, data.brand)
      const topBrand = addPropertiesToListItem(FILTER_CODE.topBrand, data.topBrand)
      const newBrand = addPropertiesToListItem(FILTER_CODE.newBrand, data.newBrand)

      setFilterData({
        color,
        price,
        discount,
        benefit,
        brand,
        topBrand,
        newBrand,
      })
    }

    fetchFilterData()
  }, [])

  const addPropertiesToListItem = <T extends IFilterItem | IFilterBrandItem>(
    type: TSelectedFilterItemKey,
    list: T[],
  ): (T & { isActive: boolean })[] => {
    const newList: (T & { isActive: boolean; type: TSelectedFilterItemKey })[] = []

    for (const item of list) {
      newList.push({ ...item, isActive: false, type })
    }

    return newList
  }

  const handleAddFilter = (type: TSelectedFilterItemKey, item: TArgFilterDataItem) => {
    const newFilterList = filterData[type].map((filterItem) => {
      if (filterItem.code === item.code) filterItem.isActive = true
      return filterItem
    })

    setFilterData({
      ...filterData,
      [type]: newFilterList,
    })

    setSelectedFilterList([
      ...selectedFilterList,
      {
        type,
        code: item.code,
        name: item.name,
      },
    ])
  }

  const handleDeleteFilter = (type: TSelectedFilterItemKey, targetCode: TFilterItemCode) => {
    const newFilterList = filterData[type].map((filterItem) => {
      if (filterItem.code === targetCode) filterItem.isActive = false
      return filterItem
    })

    setFilterData({
      ...filterData,
      [type]: newFilterList,
    })

    const newSelectedList = selectedFilterList.filter(
      (filterItem: ISelectedFilterItem) => filterItem.code !== targetCode,
    )
    setSelectedFilterList(newSelectedList)
  }

  const handlePriceFilter = (minValue: number, maxValue: number) => {
    setFilterData({
      ...filterData,
      [FILTER_CODE.price]: {
        ...filterData[FILTER_CODE.price],
        min: minValue,
        max: maxValue,
      },
    })

    // 입력한 min, max 를 limit 금액과 비교
    const min = minValue > filterData.price.limitMin ? minValue : ''
    const max = maxValue < filterData.price.limitMax ? maxValue : ''

    // selectedFilterList 에 'type: price' 인 아이템이 있는지 확인
    const priceItemIndex = selectedFilterList.findIndex((item) => item.type === FILTER_CODE.price)

    if (priceItemIndex !== -1) {
      // 있는 경우
      // min, max 금액이 모두 없으면 selectedFilterList에서 price 아이템 삭제
      if (!min && !max) {
        const newSelectedList = selectedFilterList.filter(
          (filterItem: ISelectedFilterItem) => filterItem.type !== FILTER_CODE.price,
        )
        setSelectedFilterList(newSelectedList)
        return
      }

      // min, max 있으면 price 아이템의 name 변경
      const newList = [...selectedFilterList]
      newList[priceItemIndex].name = `${min}~${max}`
      setSelectedFilterList(newList)
    } else {
      // 없으면 아이템 추가
      setSelectedFilterList([
        ...selectedFilterList,
        {
          type: FILTER_CODE.price,
          code: FILTER_CODE.price,
          name: `${min}~${max}`,
        },
      ])
    }
  }

  const handleDeleteSelectedItem = (item: ISelectedFilterItem) => {
    if (item.type !== FILTER_CODE.price) {
      handleDeleteFilter(item.type, item.code)
    }
  }

  const checkActiveTabItem = (targetType: TFilterKey) => {
    const typesToCheck = {
      [FILTER_CODE.color]: [FILTER_CODE.color],
      [FILTER_CODE.price]: [FILTER_CODE.price],
      [FILTER_CODE.discountBenefit]: [FILTER_CODE.discount, FILTER_CODE.benefit],
      [FILTER_CODE.brand]: [FILTER_CODE.brand, FILTER_CODE.topBrand, FILTER_CODE.newBrand],
    }

    const targetFilterTypes = typesToCheck[targetType]

    return selectedFilterList.some((item) => {
      // 현재 타입이 targetFilterTypes 배열에 포함되어 있는지 확인
      return targetFilterTypes.includes(item.type)
    })
  }

  const setTabs = () => {
    return FILTER_BAR_LIST.map((item) => {
      item.isActive = checkActiveTabItem(item.code)
      return item
    })
  }

  const CurrentContent = (tab: TFilterKey) => {
    switch (tab) {
      case FILTER_CODE.color:
        return (
          <ColorContent
            filterData={filterData.color}
            onAdd={handleAddFilter}
            onDelete={handleDeleteFilter}
          />
        )
      case FILTER_CODE.price:
        return <PriceContent filterData={filterData.price} onChange={handlePriceFilter} />
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

  const handleClickTab = (tab: IFilterBarListItem) => {
    setActiveTab(tab.code)
  }

  return (
    <div>
      <Modal isOpen={isOpen} onCancel={onCancel}>
        <Modal.Content>
          <Tabs activeId={activeTab} tabList={setTabs()} onClickTab={handleClickTab} />
          <div className={styles.filterContent}>{CurrentContent(activeTab)}</div>
          <SelectedFilterList list={selectedFilterList} onDelete={handleDeleteSelectedItem} />
          <FilterBottomBtns />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ModalFilter
