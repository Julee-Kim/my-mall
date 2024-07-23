import { useState, useEffect } from 'react'
import { ISelectedFilterItem, TFilterItemCode } from '@/types/filter'
import { FILTER_CODE } from '@/constants/filter'
import { formatToKorean } from '@/utils'

export const useSelectedFilterListData = (initialState: ISelectedFilterItem[]) => {
  const [selectedFilterList, setSelectedFilterList] = useState<ISelectedFilterItem[]>([])

  useEffect(() => {
    setSelectedFilterList(initialState)
  }, [initialState])

  const addSelectedItem = (item: ISelectedFilterItem) => {
    setSelectedFilterList((prevList) => [...prevList, item])
  }

  const removeSelectedItem = (code: TFilterItemCode) => {
    setSelectedFilterList((prevList) => prevList.filter((filterItem) => filterItem.code !== code))
  }

  const updateSelectedPrice = (minValue: number, maxValue: number) => {
    setSelectedFilterList((prevList) => {
      const min = minValue ? minValue : ''
      const max = maxValue ? maxValue : ''

      // selectedFilterList 에 'type: price' 인 아이템이 있는지 확인
      const priceItemIndex = prevList.findIndex((item) => item.type === FILTER_CODE.price)

      if (priceItemIndex !== -1) {
        // 이미 있는 경우
        // min, max 금액이 모두 없으면 selectedFilterList에서 price 아이템 삭제
        if (!min && !max) {
          return prevList.filter((item) => item.type !== FILTER_CODE.price)
        }

        // min, max 있으면 price 아이템의 name 변경
        const newList = [...prevList]
        const minName = min ? formatToKorean(min) : min
        const maxName = max ? formatToKorean(max) : max
        newList[priceItemIndex].name = `${minName}~${maxName}`
        return newList
      }

      // min, max 금액이 모두 없으면 이전 목록 리턴
      if (!min && !max) {
        return [...prevList]
      }

      const minName = min ? formatToKorean(min) : min
      const maxName = max ? formatToKorean(max) : max

      // 없으면 아이템 추가
      return [
        ...prevList,
        {
          type: FILTER_CODE.price,
          code: FILTER_CODE.price,
          name: `${minName}~${maxName}`,
        },
      ]
    })
  }

  const resetSelectedPrice = () => {
    setSelectedFilterList((prevList) => prevList.filter((item) => item.type !== FILTER_CODE.price))
  }

  const resetSelectedFilterList = () => {
    setSelectedFilterList([])
  }

  return {
    selectedFilterList,
    addSelectedItem,
    removeSelectedItem,
    updateSelectedPrice,
    resetSelectedPrice,
    resetSelectedFilterList,
  }
}

export default useSelectedFilterListData
