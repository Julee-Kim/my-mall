import React from 'react'
import Button from '@/components/_common/button/Button'
import { IoIosArrowDown } from 'react-icons/io'

const ButtonCategoryTitle = ({ name, showSub }: { name: string; showSub: () => void }) => {
  return (
    <h1 style={{ textAlign: 'center' }}>
      <Button
        icon={name && <IoIosArrowDown color={'#000'} size={15} style={{ marginLeft: '4px' }} />}
        onClick={showSub}
      >
        {name}
      </Button>
    </h1>
  )
}

export default ButtonCategoryTitle
