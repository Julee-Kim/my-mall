'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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
import useQueryProductList from '@/hooks/queries/useProductList'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import FilterBar from '@/components/products/filter/FilterBar'
import ModalFilter from '@/components/products/filter/modalFilter/ModalFilter'
import styles from './Filter.module.scss'

const Filter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedTab, setSelectedTap] = useState<TFilterKey>(FILTER_CODE.color)
  const [filterBar, setFilterBar] = useState<IFilterBar>({ ...initialFilterBar })
  const { updateQueryParams } = useQueryProductList()

  const handleRefresh = () => {
    console.log('handleRefresh')
  }

  const openModalFilter = (tabCode: TFilterKey) => {
    setSelectedTap(tabCode)
    setIsOpen(true)
  }

  const groupFiltersByType = (
    list: ISelectedFilterItem[],
    limitPrice: ILimitPrice,
  ): Record<string, string> => {
    return list.reduce((filterQueryParams: Record<string, string>, item: ISelectedFilterItem) => {
      if (!filterQueryParams[item.type]) {
        filterQueryParams[item.type] = ''
      }

      if (item.type === FILTER_CODE.price) {
        // 가격
        const [min, max] = item.name.split('~')

        const minValue = min ? min : limitPrice.limitMin
        const maxValue = max ? max : limitPrice.limitMax

        filterQueryParams[item.type] = `${minValue},${maxValue}`
      } else {
        // 컬러, 할인/혜택, 브랜드
        filterQueryParams[item.type] = filterQueryParams[item.type]
          ? `${filterQueryParams[item.type]},${item.code}`
          : String(item.code)
      }

      return filterQueryParams
    }, {})
  }

  const selectedItemToFilterBarData = (list: ISelectedFilterItem[]): IFilterBar => {
    // 선택한 필터 아이템 타입별로 데이터 정리
    const filterTempForOrder = list.reduce(
      (acc, item) => {
        const key = filterBarTypeToMapping[item.type]
        if (key) acc[key].push(item)
        return acc
      },
      { ...initialFilterTempForOrder } as TFilterBarTypeToMapping,
    )

    const result = Object.entries(filterTempForOrder).reduce(
      (acc, cur) => {
        const [curKey, curValue]: [string, ISelectedFilterItem[]] = cur

        if (curValue && curValue.length > 0) {
          // TODO. ts 에러 해결
          const accItem = acc[curKey] as IFilterBarValue
          accItem.isActive = true
          accItem.name = curValue[0].name
          if (curValue.length > 1) {
            accItem.name += ` 외${curValue.length - 1}`
          }
        }
        return acc
      },
      { ...initialFilterBar } as IFilterBar,
    )

    return result
  }

  const handleOk = async (selectedFilterList: ISelectedFilterItem[], limitPrice: ILimitPrice) => {
    setIsOpen(false)

    /**
     *  선택한 필터 목록을 type 별로 분류 후 상품 목록 refetch
     *    성공 후
     *     1. url query 변경
     *     2. 선택한 필터 목록을 활용하여 FilterBar 컴포넌트에서 사용하는 filterBar data 변경
     * */

    // 현재 카테고리 추출
    const categoryTop = searchParams.get('categoryTop') || ''
    const categorySub = searchParams.get('categorySub') || ''

    // 선택한 필터 목록을 type 별로 분류
    const groupFilters = groupFiltersByType(selectedFilterList, limitPrice)

    // 현재 카테고리와 선택한 필터로 query params 생성
    const queryParams = {
      categoryTop,
      categorySub,
      ...groupFilters,
    } as IProductListParams

    // 상품 목록 refetch
    const isSuccess = await updateQueryParams(queryParams)
    if (isSuccess) {
      // url 변경
      const queryString = paramsToString(queryParams)
      const newUrl = `${window.location.pathname}?${queryString}`
      router.replace(newUrl)

      // filterBar 데이터 변경
      const newFilterBarData = selectedItemToFilterBarData(selectedFilterList)
      setFilterBar(newFilterBarData)
    }
  }

  const handleCancel = () => {
    console.log('handleCancel')
    setIsOpen(false)
  }

  const hasFilterKey = (params: Record<string, string>): boolean => {
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
          const [min, max] = params[filterKey].split(',')

          const minValue = Number(min) !== data.price.limitMin ? min : ''
          const maxValue = Number(max) !== data.price.limitMax ? max : ''
          arr.push({
            type: filterKey as TSelectedFilterKey,
            code: filterKey as TSelectedFilterKey,
            name: `${minValue}~${maxValue}`,
          })
        } else {
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
        const { data } = await fetchFilters()

        // params를 selectedItem 형태로 변경
        const selectedItems = paramsToSelectedItemsData(data, params)
        // filterBar 데이터 변경
        const newFilterBarData = selectedItemToFilterBarData(selectedItems)
        setFilterBar(newFilterBarData)
      } catch (e) {
        console.log(e)
      }
    }

    // query params 체크
    const isHasFilterKey = hasFilterKey(params)

    if (isHasFilterKey) {
      fetchFilterData()
    }
  }, [])

  return (
    <>
      <div className={styles.filterWrap}>
        <div className={styles.btnRefreshWrap}>
          <ButtonRefresh onClick={handleRefresh} />
        </div>
        <FilterBar data={filterBar} onClickBtn={openModalFilter} />
      </div>
      <ModalFilter isOpen={isOpen} onOk={handleOk} onCancel={handleCancel} tab={selectedTab} />
    </>
  )
}

export default Filter
