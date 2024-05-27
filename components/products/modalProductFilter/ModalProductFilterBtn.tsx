import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import ProductFilterBtn from '@/components/products/productFilterBtn/ProductFilterBtn'

interface IModalProductFilterBtnProps {
  btnText: string
  code: string
  handleBtn: () => void
}

const ModalProductFilterBtn = ({ btnText, handleBtn }: IModalProductFilterBtnProps) => {
  return (
    <ProductFilterBtn
      isActive={true}
      btnText={btnText}
      icon={<IoCloseOutline color={'rgb(158, 158, 158)'} size={12} style={{ marginLeft: '2px' }} />}
      onClick={handleBtn}
    />
  )
}

export default ModalProductFilterBtn
