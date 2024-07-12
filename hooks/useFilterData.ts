import { useState } from 'react'
import {
  IFilterData,
  IFilterItem,
  IFilterBrandItem,
  TSelectedFilterItemKey,
  TSelectedFilterKey,
} from '@/types/filter'
import { FILTER_CODE, initialFilterData } from '@/constants/filter'

export const useFilterData = () => {
  const [filterData, setFilterDataState] = useState<IFilterData>(initialFilterData)

  const setFilterData = (data: IFilterData) => {
    setFilterDataState(data)
  }

  const activeFilter = (type: TSelectedFilterItemKey, item: IFilterItem | IFilterBrandItem) => {
    setFilterDataState((prevData) => {
      const newFilterList = prevData[type].map((filterItem) => {
        if (filterItem.code === item.code) filterItem.isActive = true
        return filterItem
      })

      return {
        ...prevData,
        [type]: newFilterList,
      }
    })
  }

  const deactivateFilter = (type: TSelectedFilterItemKey, code: number | string) => {
    setFilterDataState((prevData) => {
      const newFilterList = prevData[type].map((filterItem) => {
        if (filterItem.code === code) {
          return { ...filterItem, isActive: false }
        }
        return filterItem
      })

      return {
        ...prevData,
        [type]: newFilterList,
      }
    })
  }

  const updatePriceFilter = (minValue: number, maxValue: number) => {
    setFilterDataState((prevData) => ({
      ...prevData,
      [FILTER_CODE.price]: {
        ...prevData[FILTER_CODE.price],
        min: minValue,
        max: maxValue,
      },
    }))
  }

  const resetPriceFilter = () => {
    setFilterDataState((prevData) => ({
      ...prevData,
      [FILTER_CODE.price]: {
        ...prevData[FILTER_CODE.price],
        min: prevData[FILTER_CODE.price].limitMin,
        max: prevData[FILTER_CODE.price].limitMax,
      },
    }))
  }

  const resetFilter = (type: TSelectedFilterItemKey) => {
    setFilterDataState((prevData) => {
      const newFilterList = prevData[type].map((filterItem) => {
        if (filterItem.isActive) {
          return { ...filterItem, isActive: false }
        }
        return filterItem
      })

      return {
        ...prevData,
        [type]: newFilterList,
      }
    })
  }

  const resetFilterData = (targetTypes: TSelectedFilterKey[]) => {
    for (const targetType of targetTypes) {
      if (targetType === FILTER_CODE.price) {
        resetPriceFilter()
      } else {
        resetFilter(targetType)
      }
    }
  }

  return {
    filterData,
    setFilterData,
    activeFilter,
    deactivateFilter,
    updatePriceFilter,
    resetPriceFilter,
    resetFilterData,
  }
}
