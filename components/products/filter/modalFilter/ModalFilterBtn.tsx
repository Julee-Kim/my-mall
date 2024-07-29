import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import FilterBtn from '@/components/products/filter/filterBtn/FilterBtn'

interface IModalProductFilterBtnProps {
  btnText: string
  handleBtn: () => void
}

const ModalFilterBtn = ({ btnText, handleBtn }: IModalProductFilterBtnProps) => {
  return (
    <FilterBtn
      isActive={true}
      btnText={btnText}
      icon={<IoCloseOutline color={'rgb(158, 158, 158)'} size={12} style={{ marginLeft: '2px' }} />}
      onClick={handleBtn}
    />
  )
}

export default ModalFilterBtn
