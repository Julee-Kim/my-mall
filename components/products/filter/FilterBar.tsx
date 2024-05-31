import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IFilterBarValue, TFilterKey } from '@/types/filter'
import { useFilterStore } from '@/store/filter'
import FilterBtn from '@/components/products/filter/filterBtn/FilterBtn'
import styles from '@/components/products/filter/Filter.module.scss'

const FilterBar = ({ onClickBtn }: { onClickBtn: (tabCode: TFilterKey) => void }) => {
  const { filterBar } = useFilterStore()

  const btnText = (value: IFilterBarValue) => {
    const { list, name } = value

    if (list.length) {
      let btnText = list[0]?.name

      if (list.length > 1) {
        btnText += ` 외${list.length - 1}`
      }
      return btnText
    } else {
      return name
    }
  }

  return (
    <ul className={styles.filter}>
      {Array.from(Object.entries(filterBar)).map(([key, value]) => {
        const filterKey = key as TFilterKey

        return (
          <li key={key} className={styles.filterItem}>
            <FilterBtn
              isActive={value.list.length > 0}
              onClick={() => onClickBtn(filterKey)}
              btnText={btnText(value)}
              icon={
                <IoIosArrowDown
                  color={'rgb(158, 158, 158)'}
                  size={12}
                  style={{ marginLeft: '2px' }}
                />
              }
            />
          </li>
        )
      })}
    </ul>
  )
}

export default FilterBar
