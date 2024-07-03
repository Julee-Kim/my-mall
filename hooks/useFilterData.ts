import { useState } from 'react'
import { IFilterData, IFilterItem, IFilterBrandItem, TSelectedFilterItemKey } from '@/types/filter'
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

  return {
    filterData,
    setFilterData,
    activeFilter,
    deactivateFilter,
    updatePriceFilter,
    resetPriceFilter,
  }
}
