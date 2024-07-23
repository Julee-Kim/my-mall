'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { clone } from 'remeda'
import {
  IFilterBarListItem,
  IFilterBrandItem,
  IFilterCountPayload,
  IFilterItem,
  IFiltersRes,
  ILimitPrice,
  IModalProductFilterProps,
  ISelectedFilterItem,
  TAddPropertiesToListItem,
  TArgFilterDataItem,
  TFilterItemCode,
  TFilterKey,
  TSelectedFilterItemKey,
} from '@/types/filter'
import { FILTER_CODE, initialFilterBar, tabTypesToCheck } from '@/constants/filter'
import { fetchFilterCount, fetchFilters } from '@/services/filters'
import { useFilterData } from '@/hooks/products/useFilterData'
import useFiltersQuery from '@/hooks/_queries/useFiltersQuery'
import { useSelectedFilterListData } from '@/hooks/products/useSelectedFilterListData'
import { formatToNumber } from '@/utils'
import { Modal } from '@/components/_common/modal/Modal'
import Tabs from '@/components/products/filter/modalFilter/tabs/Tabs'
import ColorContent from '@/components/products/filter/modalFilter/filterContents/ColorContent'
import PriceContent from '@/components/products/filter/modalFilter/filterContents/PriceContent'
import DiscountBenefitContent from '@/components/products/filter/modalFilter/filterContents/DiscountBenefitContent'
import BrandContent from '@/components/products/filter/modalFilter/filterContents/BrandContent'
import SelectedFilterList from '@/components/products/filter/modalFilter/SelectedFilterList'
import FilterBottomBtns from '@/components/products/filter/modalFilter/FilterBottomBtns'
import styles from './ModalFilter.module.scss'

const ModalFilter = ({
  isOpen,
  onOk,
  onCancel,
  tab,
  selectedFilters,
}: IModalProductFilterProps) => {
  const searchParams = useSearchParams()
  const { filters } = useFiltersQuery()
  const [activeTab, setActiveTab] = useState<TFilterKey>(FILTER_CODE.color)
  const [totalCount, setTotalCount] = useState(0)
  const {
    filterData,
    setFilterData,
    activeFilter,
    deactivateFilter,
    updatePriceFilter,
    resetPriceFilter,
    resetFilterData,
  } = useFilterData()
  const {
    selectedFilterList,
    addSelectedItem,
    removeSelectedItem,
    updateSelectedPrice,
    resetSelectedPrice,
    resetSelectedFilterList,
  } = useSelectedFilterListData(selectedFilters)

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])

  useEffect(() => {
    if (isOpen && filters) {
      setFilterDataAndTotal(filters.data, filters.total)
    }
  }, [isOpen])

  useEffect(() => {
    const fetchFilterCountData = async () => {
      try {
        const { limitMin, limitMax } = filterData[FILTER_CODE.price]

        const groupFilters = groupFiltersByType(selectedFilterList, { limitMin, limitMax })

        const categoryTop = searchParams.get('categoryTop') || ''
        const categorySub = searchParams.get('categorySub') || ''

        const payload = {
          ...groupFilters,
          categoryTop,
          categorySub,
        }

        const { total } = await fetchFilterCount(payload)
        setTotalCount(total)
      } catch (e) {
        console.log(e)
      }
    }

    if (isOpen) fetchFilterCountData()
  }, [selectedFilterList])

  const groupFiltersByType = (
    list: ISelectedFilterItem[],
    limitPrice: ILimitPrice,
  ): IFilterCountPayload => {
    return list.reduce((acc, item) => {
      const { type, name, code } = item

      switch (type) {
        case FILTER_CODE.price:
          const [min, max] = name.split('~')
          const minValue = min ? formatToNumber(min) : limitPrice.limitMin
          const maxValue = max ? formatToNumber(max) : limitPrice.limitMax
          acc[FILTER_CODE.price] = { min: minValue, max: maxValue }
          break

        case FILTER_CODE.brand:
        case FILTER_CODE.topBrand:
        case FILTER_CODE.newBrand:
          if (!acc[FILTER_CODE.brand]) acc[FILTER_CODE.brand] = []
          acc[FILTER_CODE.brand].push(Number(code))
          break

        case FILTER_CODE.color:
        case FILTER_CODE.discount:
        case FILTER_CODE.benefit:
          if (!acc[type]) acc[type] = []
          ;(acc[type] as string[]).push(String(code))
          break
      }

      return acc
    }, {} as IFilterCountPayload)
  }

  const checkActiveItem = (targetCode: number | string) => {
    return selectedFilterList.some((item) => targetCode === item.code)
  }

  const addPropertiesToListItem = <T extends IFilterItem | IFilterBrandItem>(
    type: TSelectedFilterItemKey,
    list: T[],
  ): TAddPropertiesToListItem<T> => {
    return list.map((item) => ({ ...item, isActive: checkActiveItem(item.code), type }))
  }

  const checkPrice = () => {
    const priceItem = selectedFilterList.find((item) => item.type === 'price')

    if (priceItem) {
      const [min, max] = priceItem.name.split('~')
      return { min: formatToNumber(min), max: formatToNumber(max) }
    }

    return null
  }

  const setFilterDataAndTotal = (data: IFiltersRes, total: number) => {
    const { limitMin, limitMax } = data.price

    const selectedPrice = checkPrice()
    const minPrice = selectedPrice?.min && selectedPrice?.min !== 0 ? selectedPrice.min : limitMin
    const maxPrice = selectedPrice?.max && selectedPrice?.max !== 0 ? selectedPrice.max : limitMax

    const price = { ...data.price, min: minPrice, max: maxPrice }
    const color = addPropertiesToListItem(FILTER_CODE.color, data.color)
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
    setTotalCount(total)
  }

  const handleAddFilter = (type: TSelectedFilterItemKey, item: TArgFilterDataItem) => {
    activeFilter(type, item)
    addSelectedItem({
      type,
      code: item.code,
      name: item.name,
    })
  }

  const handleDeleteFilter = (type: TSelectedFilterItemKey, targetCode: TFilterItemCode) => {
    deactivateFilter(type, targetCode)
    removeSelectedItem(targetCode)
  }

  const handlePriceFilter = (minValue: number, maxValue: number) => {
    updatePriceFilter(minValue, maxValue)

    // 입력한 min, max 를 limit 금액과 비교, limit 와 같을 경우에는 0 할당
    const min = minValue > filterData.price.limitMin ? minValue : 0
    const max = maxValue < filterData.price.limitMax ? maxValue : 0
    updateSelectedPrice(min, max)
  }

  const handleDeletePriceFilter = () => {
    resetPriceFilter()
    resetSelectedPrice()
  }

  const handleDeleteSelectedItem = (item: ISelectedFilterItem) => {
    if (item.type === FILTER_CODE.price) {
      handleDeletePriceFilter()
    } else {
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
    const copyFilterBarData = clone(initialFilterBar)

    return Object.entries(copyFilterBarData).reduce((acc, [curKey, curValue]) => {
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
            onAdd={handleAddFilter}
            onDelete={handleDeleteFilter}
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

  const handleReset = () => {
    // 선택한 목록 초기화
    resetSelectedFilterList()

    // 초기화 'type' 중복 없이 추출
    const types = Array.from(new Set(selectedFilterList.map((item) => item.type)))
    // 필터 데이터 초기화
    resetFilterData(types)
  }

  return (
    <div>
      <Modal isOpen={isOpen} onCancel={onCancel}>
        <Modal.Content>
          <Tabs activeId={activeTab} tabList={tabList()} onClickTab={handleClickTab} />
          <div
            className={[
              styles.filterContent,
              selectedFilterList.length > 0 ? styles.pb20 : '',
            ].join(' ')}
          >
            {CurrentContent(activeTab)}
          </div>
          <SelectedFilterList
            list={selectedFilterList}
            onDelete={handleDeleteSelectedItem}
            onReset={handleReset}
          />
          <FilterBottomBtns total={totalCount} onSearch={handleSearchBtn} onCancel={onCancel} />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ModalFilter
