'use client'

import React, { useState } from 'react'
import { IFilterBar, TFilterKey } from '@/types/filter'
import { FILTER_CODE, initialFilterBar } from '@/constants/filter'
import ButtonRefresh from '@/components/products/ButtonRefresh'
import FilterBar from '@/components/products/filter/FilterBar'
import ModalFilter from '@/components/products/filter/modalFilter/ModalFilter'
import styles from './Filter.module.scss'

const Filter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedTab, setSelectedTap] = useState<TFilterKey>(FILTER_CODE.color)
  const [filterBar, setFilterBar] = useState<IFilterBar>({ ...initialFilterBar })

  const handleRefresh = () => {
    console.log('handleRefresh')
  }

  const openModalFilter = (tabCode: TFilterKey) => {
    setSelectedTap(tabCode)
    setIsOpen(true)
  }

  const handleOk = () => {
    console.log('handleOk')
    /**
     * 1. store/filter > selectedFilters 값을 상품 검색의 파라미터로 분리
     * 2. 모달 필터 닫기(handleCancel())
     * 3. 상품 목록 api 요청 (페이지 로더 노출)
     *    성공 후 처리
     *     - url query 변경
     *     - FilterBar.tsx에서 사용하는 store/filter > filterBar 값 변경
     * */
    setIsOpen(false)
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
