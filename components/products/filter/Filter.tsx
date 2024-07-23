'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { clone } from 'remeda'
import {
  IFilterBar,
  IFilterBarValue,
  IFilterBrandItem,
  IFilterItem,
  IFiltersRes,
  ILimitPrice,
  ISelectedFilterItem,
  TFilterBarTypeToMapping,
  TFilterKey,
  TFilterParams,
  TSelectedFilterKey,
} from '@/types/filter'
import { IProductListParams } from '@/types/product'
import {
  FILTER_CODE,
  FILTER_KEYS,
  filterBarTypeToMapping,
  initialFilterBar,
  initialFilterTempForOrder,
} from '@/constants/filter'
import { fetchFilters } from '@/services/filters'
import { paramsToObject, paramsToString } from '@/utils/queryParams'
import { formatToKorean, formatToNumber } from '@/utils'
import useQueryProductList from '@/hooks/queries/useProductList'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import FilterBar from '@/components/products/filter/FilterBar'
import ModalFilter from '@/components/products/filter/modalFilter/ModalFilter'
import styles from './Filter.module.scss'

const Filter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isFetched } = useQueryProductList()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedTab, setSelectedTap] = useState<TFilterKey>(FILTER_CODE.color)
  const [filterBar, setFilterBar] = useState<IFilterBar>(clone(initialFilterBar))
  const [selectedFilterList, setSelectedFilterList] = useState<ISelectedFilterItem[]>([])

  const openModalFilter = (tabCode: TFilterKey) => {
    setSelectedTap(tabCode)
    setIsOpen(true)
  }

  const groupFiltersByType = (
    list: ISelectedFilterItem[],
    limitPrice: ILimitPrice,
  ): TFilterParams => {
    return list.reduce((acc, item) => {
      if (item.type === FILTER_CODE.price) {
        // 가격
        const [min, max] = item.name.split('~')

        const minValue = min ? formatToNumber(min) : limitPrice.limitMin
        const maxValue = max ? formatToNumber(max) : limitPrice.limitMax

        acc[item.type] = `${minValue},${maxValue}`
      } else {
        // 컬러, 할인/혜택, 브랜드
        acc[item.type] = acc[item.type] ? `${acc[item.type]},${item.code}` : String(item.code)
      }

      return acc
    }, {} as TFilterParams)
  }

  const selectedItemToFilterBarData = (list: ISelectedFilterItem[]): IFilterBar => {
    // 선택한 필터 아이템 타입별로 분류
    const copyFilterTempForOrder = clone(initialFilterTempForOrder)
    const filterTempForOrder = list.reduce((acc, item) => {
      const key = filterBarTypeToMapping[item.type]
      if (key) acc[key].push(item)
      return acc
    }, copyFilterTempForOrder as TFilterBarTypeToMapping)

    // 타입별로 정리한 데이터를 filterBarData 형태로 가공
    const copyFilterBarData = clone(initialFilterBar)
    const result = Object.entries(filterTempForOrder).reduce((acc, cur) => {
      const [curKey, curValue]: [string, ISelectedFilterItem[]] = cur

      if (curValue && curValue.length > 0) {
        const key = curKey as TFilterKey
        const accItem = acc[key] as IFilterBarValue
        accItem.isActive = true
        accItem.name = curValue[0].name

        // 선택한 필터가 1개 이상인 경우 '외 n(개)'로 표기
        if (curValue.length > 1) {
          accItem.name += ` 외${curValue.length - 1}`
        }
      }
      return acc
    }, copyFilterBarData as IFilterBar)

    return result
  }

  const fetchProducts = async (
    selectedFilterList: ISelectedFilterItem[] = [],
    limitPrice?: ILimitPrice,
  ) => {
    /**
     *  선택한 필터 목록(selectedFilterList)을 type 별로 분류 후 상품 목록 fetch
     *    성공 후
     *     1. 선택한 필터 목록을 활용하여 FilterBar 컴포넌트에서 사용하는 filterBar data 변경
     *     2. 선택한 목록 selectedFilterList data 변경
     * */

    let groupFilters = {} // 선택 필터 타입별로 분류하여 할당할 값

    if (selectedFilterList.length > 0 && limitPrice) {
      // 선택한 필터가 있을 경우 type 별로 분류
      groupFilters = groupFiltersByType(selectedFilterList, limitPrice)
    }

    // 현재 카테고리 추출
    const categoryTop = searchParams.get('categoryTop') || ''
    const categorySub = searchParams.get('categorySub') || ''

    // 현재 카테고리와 선택한 필터로 query params 생성
    const queryParams = {
      categoryTop,
      categorySub,
      ...groupFilters,
    } as IProductListParams

    // url 변경
    const queryString = paramsToString(queryParams)
    const newUrl = `${window.location.pathname}?${queryString}`
    router.push(newUrl)

    // 상품 목록 fetch 성공 후
    if (isFetched) {
      // filterBar 데이터 변경
      const newFilterBarData = selectedItemToFilterBarData(selectedFilterList)
      setFilterBar(newFilterBarData)

      // selectedFilterList 변경
      setSelectedFilterList(selectedFilterList)
    }
  }

  const handleOk = (selectedFilterList: ISelectedFilterItem[], limitPrice: ILimitPrice) => {
    setIsOpen(false)
    fetchProducts(selectedFilterList, limitPrice)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const handleReset = () => {
    fetchProducts()
  }

  const checkHasFilterKey = (params: Record<string, string>): boolean => {
    return Object.keys(params).some((key) => FILTER_KEYS.includes(key as TSelectedFilterKey))
  }

  const paramsToSelectedItemsData = (
    data: IFiltersRes,
    params: Record<string, string>,
  ): ISelectedFilterItem[] => {
    let arr: ISelectedFilterItem[] = []

    for (const key in data) {
      const filterKey = key as TSelectedFilterKey

      if (filterKey in params) {
        if (filterKey === FILTER_CODE.price) {
          // 가격
          const [min, max] = params[filterKey].split(',')

          const minValue = Number(min) !== data.price.limitMin ? formatToKorean(Number(min)) : ''
          const maxValue = Number(max) !== data.price.limitMax ? formatToKorean(Number(max)) : ''
          arr.push({
            type: filterKey as TSelectedFilterKey,
            code: filterKey as TSelectedFilterKey,
            name: `${minValue}~${maxValue}`,
          })
        } else {
          // 컬러, 할인/혜택, 브랜드
          const list = data[filterKey] as (IFilterItem | IFilterBrandItem)[]
          const paramCodes = params[filterKey as TFilterKey]

          list.forEach((item: IFilterItem | IFilterBrandItem) => {
            if (paramCodes.includes(String(item.code))) {
              arr.push({
                type: filterKey as TSelectedFilterKey,
                code: item.code,
                name: item.name,
              })
            }
          })
        }
      }
    }

    return arr
  }

  useEffect(() => {
    const params = paramsToObject(searchParams)

    const fetchFilterData = async () => {
      try {
        const { data } = await fetchFilters(params)

        // params를 selectedItem 형태로 변경
        const selectedItems = paramsToSelectedItemsData(data, params)
        setSelectedFilterList(selectedItems)

        // filterBar 데이터 변경
        const newFilterBarData = selectedItemToFilterBarData(selectedItems)
        setFilterBar(newFilterBarData)
      } catch (e) {
        console.log(e)
      }
    }

    // 쿼리 파라미터에 필터(컬러,가격,할인/혜택,브랜드)가 있는지 확인
    const isHasFilterKey = checkHasFilterKey(params)

    if (isHasFilterKey) {
      fetchFilterData()
    }
  }, [])

  return (
    <>
      <div className={[styles.filterWrap, styles.FilterBarWrap].join(' ')}>
        {selectedFilterList.length > 0 && (
          <div className={styles.btnRefreshWrap}>
            <ButtonRefresh onClick={handleReset} />
          </div>
        )}
        <FilterBar data={filterBar} onClickBtn={openModalFilter} />
      </div>
      <ModalFilter
        isOpen={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        tab={selectedTab}
        selectedFilters={selectedFilterList}
      />
    </>
  )
}

export default Filter
