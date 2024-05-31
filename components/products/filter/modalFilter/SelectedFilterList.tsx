import React from 'react'
import { ISelectedFilter } from '@/types/filter'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import ModalFilterBtn from '@/components/products/filter/modalFilter/ModalFilterBtn'
import styles from '@/components/products/filter/Filter.module.scss'
import modalStyles from '@/components/products/filter/modalFilter/ModalFilter.module.scss'
import { useFilterStore } from '@/store/filter'

const SelectedFilterList = () => {
  const { selectedFilters, setSelectedFilters } = useFilterStore()

  const handleRefresh = () => {
    console.log('handleRefresh')
  }

  const deleteFilter = (selectedItem: ISelectedFilter) => {
    setSelectedFilters(
      selectedFilters.filter((filter: ISelectedFilter) => filter.code !== selectedItem.code),
    )
  }

  return (
    selectedFilters.length > 0 && (
      <div className={[styles.filterWrap, modalStyles.filterSelectedList].join(' ')}>
        <div className={styles.btnRefreshWrap}>
          <ButtonRefresh onClick={handleRefresh} />
        </div>
        <ul>
          {selectedFilters.map((filter: ISelectedFilter) => (
            <li key={filter.code} className={styles.filterItem}>
              <ModalFilterBtn btnText={filter.name} handleBtn={() => deleteFilter(filter)} />
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default SelectedFilterList
