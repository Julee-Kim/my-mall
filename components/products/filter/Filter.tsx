'use client'

import React from 'react'
import useFilter from '@/hooks/filter/useFilter'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import FilterBar from '@/components/products/filter/FilterBar'
import ModalFilter from '@/components/products/filter/modalFilter/ModalFilter'
import styles from './Filter.module.scss'

const Filter = () => {
  const {
    isOpen,
    selectedTab,
    filterBar,
    selectedFilterList,
    openModalFilter,
    handleOk,
    handleCancel,
    handleReset,
  } = useFilter()

  return (
    <>
      <div className={[styles.filterWrap, styles.FilterBarWrap].join(' ')}>
        {selectedFilterList.length > 0 && (
          <div className={styles.btnRefreshWrap}>
            <ButtonRefresh onClick={handleReset} />
          </div>
        )}
        <FilterBar data={filterBar} onClickBtn={openModalFilter} />
      </div>
      <ModalFilter
        isOpen={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        tab={selectedTab}
        selectedFilters={selectedFilterList}
      />
    </>
  )
}

export default Filter
