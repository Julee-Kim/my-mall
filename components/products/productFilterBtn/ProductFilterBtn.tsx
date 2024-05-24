import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IFilterValue } from '@/types/filter'
import Button from '@/components/_common/button/Button'
import styles from '../ProductFilterBtn/ProductFilterBtn.module.scss'

const ProductFilterBtn = ({ filter, onClick }: { filter: IFilterValue; onClick: () => void }) => {
  let btnText = ''

  if (filter.isActive) {
    if (filter.code === 'price') {
      if ('selectedRange' in filter) {
        const selectedRange = filter.selectedRange
        const min = selectedRange.min ? selectedRange.min : ''
        const max = selectedRange.max ? selectedRange.max : ''
        btnText = min + '~' + max
      }
    } else {
      if ('selectedList' in filter) {
        const selectedList = filter.selectedList ?? []

        btnText = selectedList[0]?.name
        if (selectedList.length > 1) {
          btnText += ` 외${selectedList.length - 1}`
        }
      }
    }
  } else {
    btnText = filter.name
  }

  return (
    <Button
      icon={<IoIosArrowDown color={'rgb(158, 158, 158)'} size={12} style={{ marginLeft: '2px' }} />}
      style={{ height: '16px' }}
      className={[styles.filterItemBtn, filter.isActive ? styles.active : ''].join(' ')}
      onClick={onClick}
    >
      {btnText}
    </Button>
  )
}

export default ProductFilterBtn
