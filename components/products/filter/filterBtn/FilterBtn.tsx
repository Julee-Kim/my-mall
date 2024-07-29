import React, { ReactNode } from 'react'
import Button from '@/components/_common/button/Button'
import styles from './FilterBtn.module.scss'

interface IProductFilterBtn {
  isActive: boolean
  btnText: string
  onClick: () => void
  icon: ReactNode
}
const FilterBtn = ({ isActive, btnText, onClick, icon }: IProductFilterBtn) => {
  return (
    <Button
      icon={icon}
      className={[styles.filterItemBtn, isActive ? styles.active : ''].join(' ')}
      onClick={onClick}
    >
      {btnText}
    </Button>
  )
}

export default FilterBtn
