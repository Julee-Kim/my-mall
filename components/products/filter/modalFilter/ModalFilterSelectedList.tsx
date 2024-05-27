import React from 'react'
import { IFilters } from '@/types/filter'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import ModalFilterBtn from '@/components/products/filter/modalFilter/ModalFilterBtn'
import styles from '@/components/products/filter/Filter.module.scss'
import modalStyles from '@/components/products/filter/modalFilter/ModalFilter.module.scss'

const ModalFilterSelectedList = ({ filterData }: { filterData: IFilters }) => {
  const handleRefresh = () => {
    console.log('handleRefresh')
  }

  const handleFilterBtn = (code: string) => {
    console.log('handleFilterBtn code ::', code)
  }

  const priceBtnText = (min: number, max: number) => {
    let btnText = ''

    const minPrice = min ? min : ''
    const maxPrice = max ? max : ''
    btnText = minPrice + ' ~ ' + maxPrice
    return btnText
  }

  return (
    <div className={[styles.filterWrap, modalStyles.filterSelectedList].join(' ')}>
      <div className={styles.btnRefreshWrap}>
        <ButtonRefresh onClick={handleRefresh} />
      </div>
      <ul className={styles.filter}>
        {Object.keys(filterData).flatMap((key) => {
          const filterKey = key as keyof IFilters
          const filter = filterData[filterKey]

          if (filterKey === 'price') {
            if ('selectedRange' in filter) {
              const { min, max } = filter.selectedRange

              if (min !== 0 || max !== 0) {
                return (
                  <li key={filterKey} className={styles.filterItem}>
                    <ModalFilterBtn
                      btnText={priceBtnText(min, max)}
                      code={filter.code}
                      handleBtn={() => handleFilterBtn(filter.code)}
                    />
                  </li>
                )
              }
            }
          } else {
            if ('selectedList' in filter) {
              return filter.selectedList?.map((selectedItem) => (
                <li key={selectedItem.code} className={styles.filterItem}>
                  <ModalFilterBtn
                    btnText={selectedItem.name}
                    code={filter.code}
                    handleBtn={() => handleFilterBtn(filter.code)}
                  />
                </li>
              ))
            }
          }
          return null
        })}
      </ul>
    </div>
  )
}

export default ModalFilterSelectedList
