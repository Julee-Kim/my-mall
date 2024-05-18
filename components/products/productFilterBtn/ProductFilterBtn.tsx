import React from 'react'
import Image from 'next/image'
import { IFilterValue } from '@/types/filter'
import Button from '@/components/_common/button/Button'
import IconArrowBottomGreyImg from '@/public/images/icon/icon-arrow-bottom-grey.svg'
import styles from '../ProductFilterBtn/ProductFilterBtn.module.scss'

const ProductFilterBtn = ({ filter }: { filter: IFilterValue }) => {
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

  const IconArrowBottom = () => (
    <Image src={IconArrowBottomGreyImg} alt={'검색 필터 열기'} style={{ marginLeft: '2px' }} />
  )

  return (
    <Button
      icon={<IconArrowBottom />}
      style={{ height: '16px' }}
      className={[styles.filterItemBtn, filter.isActive ? styles.active : ''].join(' ')}
    >
      {btnText}
    </Button>
  )
}

export default ProductFilterBtn
