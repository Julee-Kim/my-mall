import React from 'react'
import { SlRefresh } from 'react-icons/sl'
import Button from '@/components/_common/button/Button'

const ButtonRefresh = ({ onClick }: { onClick: () => void }) => (
  <Button
    icon={<SlRefresh />}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      border: '1px solid rgb(233, 233, 233)',
      borderRadius: '50%',
    }}
    onClick={onClick}
  />
)

export default ButtonRefresh
