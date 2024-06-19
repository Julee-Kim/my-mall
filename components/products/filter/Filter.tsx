'use client'

import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  IFilterBar,
  IFilterBarValue,
  ISelectedFilterItem,
  TFilterBarTypeToMapping,
  TFilterKey,
} from '@/types/filter'
import {
  FILTER_CODE,
  filterBarTypeToMapping,
  initialFilterBar,
  initialFilterTempForOrder,
} from '@/constants/filter'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import FilterBar from '@/components/products/filter/FilterBar'
import ModalFilter from '@/components/products/filter/modalFilter/ModalFilter'
import styles from './Filter.module.scss'
import useQueryProductList from '@/hooks/queries/useProductList'
import { paramsToString } from '@/utils/queryParams'
import { IProductListParams } from '@/types/product'

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

  const groupFiltersByType = (list: ISelectedFilterItem[]): Record<string, string> => {
    return list.reduce((filterQueryParams: Record<string, string>, item: ISelectedFilterItem) => {
      if (!filterQueryParams[item.type]) {
        filterQueryParams[item.type] = ''
      }

      if (item.type === FILTER_CODE.price) {
        const [min, max] = item.name.split('~')
        const temp = []

        if (min) temp.push(min)
        if (max) temp.push(max)

        filterQueryParams[item.type] = temp.join(',')
      } else {
        filterQueryParams[item.type] = filterQueryParams[item.type]
          ? `${filterQueryParams[item.type]},${item.code}`
          : String(item.code)
      }

      return filterQueryParams
    }, {})
  }

  const updateFilterBarData = (list: ISelectedFilterItem[]) => {
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

  const handleOk = async (selectedFilterList: ISelectedFilterItem[]) => {
    setIsOpen(false)

    /**
     * 1. store/filter > selectedFilters 값을 상품 검색의 파라미터로 분리
     * 2. 상품 목록 refetch
     *    성공 후
     *     2-1. url query 변경
     *     2-2. FilterBar 컴포넌트에서 사용하는 filterBar data 변경
     * */
    // 현재 카테고리 추출
    const categoryTop = searchParams.get('categoryTop') || ''
    const categorySub = searchParams.get('categorySub') || ''

    // 선택한 필터 목록을 type 별로 분류
    const groupFilters = groupFiltersByType(selectedFilterList)

    // 현재 카테고리와 선택한 필터로 query params 생성
    const queryParams = {
      categoryTop,
      categorySub,
      ...groupFilters,
    } as IProductListParams

    const isSuccess = await updateQueryParams(queryParams)
    if (isSuccess) {
      // url 변경
      const queryString = paramsToString(queryParams)
      const newUrl = `${window.location.pathname}?${queryString}`
      router.replace(newUrl)

      // filterBar 데이터 변경
      const newFilterBarData = updateFilterBarData(selectedFilterList)
      setFilterBar(newFilterBarData)
    }
  }

  const handleCancel = () => {
    console.log('handleCancel')
    setIsOpen(false)
  }

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
