import React from 'react'
import { ISelectedFilterListProps, ISelectedFilterItem } from '@/types/filter'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import ModalFilterBtn from '@/components/products/filter/modalFilter/ModalFilterBtn'
import styles from '@/components/products/filter/Filter.module.scss'
import modalStyles from '@/components/products/filter/modalFilter/ModalFilter.module.scss'

const SelectedFilterList = ({ list, onDelete, onReset }: ISelectedFilterListProps) => {
  return (
    list.length > 0 && (
      <div className={[styles.filterWrap, modalStyles.filterSelectedList].join(' ')}>
        <div className={styles.btnRefreshWrap}>
          <ButtonRefresh onClick={onReset} />
        </div>
        <ul className={styles.filter}>
          {list.map((filter: ISelectedFilterItem) => (
            <li key={filter.code} className={styles.filterItem}>
              <ModalFilterBtn btnText={filter.name} handleBtn={() => onDelete(filter)} />
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default SelectedFilterList
