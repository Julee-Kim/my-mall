import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IFilterBar, TFilterKey } from '@/types/filter'
import FilterBtn from '@/components/products/filter/filterBtn/FilterBtn'
import styles from '@/components/products/filter/Filter.module.scss'

const FilterBar = ({
  data,
  onClickBtn,
}: {
  data: IFilterBar
  onClickBtn: (tabCode: TFilterKey) => void
}) => {
  return (
    <ul className={styles.filter}>
      {Array.from(Object.entries(data)).map(([key, value]) => {
        const filterKey = key as TFilterKey

        return (
          <li key={key} className={styles.filterItem}>
            <FilterBtn
              isActive={value.isActive}
              onClick={() => onClickBtn(filterKey)}
              btnText={value.name}
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
