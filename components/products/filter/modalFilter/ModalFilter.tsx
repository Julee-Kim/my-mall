'use client'

import React, { useEffect, useState } from 'react'
import {
  IFilterBarListItem,
  IFilterBrandItem,
  IFilterData,
  IFilterItem,
  IModalProductFilterProps,
  ISelectedFilterItem,
  TAddPropertiesToListItem,
  TArgFilterDataItem,
  TFilterItemCode,
  TFilterKey,
  TSelectedFilterItemKey,
} from '@/types/filter'
import {
  FILTER_CODE,
  initialFilterBar,
  initialFilterData,
  tabTypesToCheck,
} from '@/constants/filter'
import { fetchFilterCount, fetchFilters } from '@/services/filters'
import { Modal } from '@/components/_common/modal/Modal'
import Tabs from '@/components/products/filter/modalFilter/tabs/Tabs'
import ColorContent from '@/components/products/filter/modalFilter/filterContents/ColorContent'
import PriceContent from '@/components/products/filter/modalFilter/filterContents/PriceContent'
import DiscountBenefitContent from '@/components/products/filter/modalFilter/filterContents/DiscountBenefitContent'
import BrandContent from '@/components/products/filter/modalFilter/filterContents/BrandContent'
import SelectedFilterList from '@/components/products/filter/modalFilter/SelectedFilterList'
import FilterBottomBtns from '@/components/products/filter/modalFilter/FilterBottomBtns'
import styles from './ModalFilter.module.scss'

const ModalFilter = ({ isOpen, onOk, onCancel, tab }: IModalProductFilterProps) => {
  const [activeTab, setActiveTab] = useState<TFilterKey>(FILTER_CODE.color)
  const [filterData, setFilterData] = useState<IFilterData>(initialFilterData)
  const [selectedFilterList, setSelectedFilterList] = useState<ISelectedFilterItem[]>([])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const { data, total } = await fetchFilters()

        const color = addPropertiesToListItem<IFilterItem>(FILTER_CODE.color, data.color)
        const price = { ...filterData.price, ...data.price }
        const discount = addPropertiesToListItem<IFilterItem>(FILTER_CODE.discount, data.discount)
        const benefit = addPropertiesToListItem<IFilterItem>(FILTER_CODE.benefit, data.benefit)
        const brand = addPropertiesToListItem<IFilterBrandItem>(FILTER_CODE.brand, data.brand)
        const topBrand = addPropertiesToListItem<IFilterBrandItem>(
          FILTER_CODE.topBrand,
          data.topBrand,
        )
        const newBrand = addPropertiesToListItem<IFilterBrandItem>(
          FILTER_CODE.newBrand,
          data.newBrand,
        )

        setFilterData({
          color,
          price,
          discount,
          benefit,
          brand,
          topBrand,
          newBrand,
        })
        setTotalCount(total)
      } catch (e) {
        console.log(e)
      }
    }

    if (isOpen) fetchFilterData()
  }, [isOpen])

  useEffect(() => {
    const fetchFilterCountData = async () => {
      try {
        const { total } = await fetchFilterCount({ test: 1 })
        setTotalCount(total)
      } catch (e) {
        console.log(e)
      }
    }

    if (isOpen) fetchFilterCountData()
  }, [selectedFilterList])

  const addPropertiesToListItem = <T extends IFilterItem | IFilterBrandItem>(
    type: TSelectedFilterItemKey,
    list: T[],
  ): TAddPropertiesToListItem<T> => {
    const newList: TAddPropertiesToListItem<T> = []

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
    // 필터 데이터에서 해당 아이템 삭제
    const newFilterList = filterData[type].map((filterItem) => {
      if (filterItem.code === targetCode) {
        return { ...filterItem, isActive: false }
      } else {
        return filterItem
      }
    })
    setFilterData({
      ...filterData,
      [type]: newFilterList,
    })

    // 선택한 필터 목록에서 해당 아이템 삭제
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
    const targetFilterTypes = tabTypesToCheck[targetType]

    return selectedFilterList.some((item) => {
      // 현재 타입이 targetFilterTypes 배열에 포함되어 있는지 확인
      return targetFilterTypes.includes(item.type)
    })
  }

  const tabList = () => {
    return Object.entries(initialFilterBar).reduce((acc, [curKey, curValue]) => {
      const key = curKey as TFilterKey
      const isActive = checkActiveTabItem(key)

      acc.push({
        code: curKey as TFilterKey,
        name: curValue.name,
        isActive: isActive,
      })

      return acc
    }, [] as IFilterBarListItem[])
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
          <DiscountBenefitContent
            discount={filterData.discount}
            benefit={filterData.benefit}
            onAdd={handleAddFilter}
            onDelete={handleDeleteFilter}
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
          />
        )
      default:
        return null
    }
  }

  const handleClickTab = (tab: IFilterBarListItem) => {
    setActiveTab(tab.code)
  }

  const handleSearchBtn = () => {
    const limitPrice = {
      limitMin: filterData.price.limitMin,
      limitMax: filterData.price.limitMax,
    }
    onOk(selectedFilterList, limitPrice)
  }

  return (
    <div>
      <Modal isOpen={isOpen} onCancel={onCancel}>
        <Modal.Content>
          <Tabs activeId={activeTab} tabList={tabList()} onClickTab={handleClickTab} />
          <div className={styles.filterContent}>{CurrentContent(activeTab)}</div>
          <SelectedFilterList list={selectedFilterList} onDelete={handleDeleteSelectedItem} />
          <FilterBottomBtns total={totalCount} onSearch={handleSearchBtn} />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ModalFilter
