import { ChangeEvent, FocusEvent, useEffect, useState } from 'react'
import { comma } from '@/utils'

interface IInputNumberProps {
  value: number
  onChange: (value: number) => void
  onBlur?: (value: number) => void
  className?: string
}

/**
 * 숫자 인풋 컴포넌트
 * @param value 인풋값
 * @param onChange onChange 이벤트
 * @param onBlur onBlur 이벤트
 * @param className 클래스명
 * */
const InputNumber = ({ value, onChange, onBlur, className }: IInputNumberProps) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (value) setInputValue(comma(value))
  }, [value])

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '')
    let num = Number(value.replace(/[^0-9]/g, ''))

    if (num) {
      onChange(num)
    } else {
      setInputValue('')
      onChange(0)
    }
  }

  const onBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      const value = e.target.value.replaceAll(',', '')
      let num = Number(value)
      onBlur(num)
    }
  }

  return (
    <input
      type="text"
      value={inputValue}
      className={className}
      onChange={(e) => onChangeInput(e)}
      onBlur={(e) => onBlurInput(e)}
    />
  )
}

export default InputNumber
