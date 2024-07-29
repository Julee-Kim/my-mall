import { ChangeEvent, useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { IFilterPriceItem } from '@/types/filter'
import { initialFilterPrice } from '@/constants/filter'
import styles from '@/components/products/filter/modalFilter/filterContents/PriceContent.module.scss'
import InputNumber from '@/components/_common/inputNumber/InputNumber'

const GAP_PRICE = 1000

const PriceContent = ({
  filterData = initialFilterPrice,
  onChange,
}: {
  filterData: IFilterPriceItem
  onChange: (min: number, max: number) => void
}) => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [minRange, setMinRange] = useState(0)
  const [maxRange, setMaxRange] = useState(0)
  const [minRangePercent, setMinRangePercent] = useState(0)
  const [maxRangePercent, setMaxRangePercent] = useState(0)
  const { limitMin, limitMax } = filterData

  useEffect(() => {
    setInitialValue(filterData.min, filterData.max)
  }, [filterData.limitMin])

  const setInitialValue = (min: number, max: number) => {
    setMinValue(min)
    setMaxValue(max)
    setMinRange(min)
    setMaxRange(max)
    changeMinRangePercent(min)
    changeMaxRangePercent(max)
  }

  const changeMinRangePercent = (min: number) => {
    setMinRangePercent(((min - limitMin) / (limitMax - limitMin)) * 100)
  }

  const changeMaxRangePercent = (max: number) => {
    setMaxRangePercent(100 - ((max - limitMin) / (limitMax - limitMin)) * 100)
  }

  const changeRange = (isMin: boolean, targetValue: string | number) => {
    let value = typeof targetValue === 'number' ? targetValue : parseInt(targetValue)

    if (isMin) {
      setMinValue(value)
      setMinRange(value)
      changeMinRangePercent(value)

      // minRange가 maxRange 보다 크지 않도록 설정
      if (value > maxRange) {
        setMaxValue(value)
        setMaxRange(value)
        changeMaxRangePercent(maxRange)
      }
    } else {
      setMaxValue(value)
      setMaxRange(value)
      changeMaxRangePercent(maxRange)

      // maxRange가 minRange 보다 작지 않도록 설정
      if (minRange > value) {
        setMinValue(value)
        setMinRange(value)
        changeMinRangePercent(minRange)
      }
    }
  }

  const blurInput = (inputValue: number, isMin: boolean) => {
    const { limitMin, limitMax } = filterData

    // 500원 단위 반올림
    let roundedAmount = Math.round(inputValue / 1000) * 1000

    // limitMin limitMax 범위의 값 할당
    const value = Math.max(limitMin, Math.min(limitMax, roundedAmount))

    if (isMin) {
      onChange(value, maxValue)
    } else {
      onChange(minValue, value)
    }

    changeRange(isMin, value)
  }

  const handleMouseUp = () => {
    onChange(minValue, maxValue)
  }

  return (
    <div>
      <h4 className={styles.title}>가격 범위 설정</h4>
      <p className={styles.desc}>가격은 천원단위로 입력해주세요.</p>
      <div className={styles.inputWrap}>
        <InputNumber
          className={styles.input}
          value={minValue}
          onChange={(value: number) => setMinValue(value)}
          onBlur={(value: number) => blurInput(value, true)}
        />
        <span className={styles.between}>~</span>
        <InputNumber
          className={styles.input}
          value={maxValue}
          onChange={(value: number) => setMaxValue(value)}
          onBlur={(value: number) => blurInput(value, false)}
        />
        <span className={styles.iconPlusWrap}>
          {maxValue === filterData.limitMax && (
            <GoPlus size={15} color={'#333'} className={styles.iconPlus} />
          )}
        </span>
      </div>
      <div className={styles.range}>
        <div className={styles.rangeSlide}>
          <div
            className={styles.rangeSlideInner}
            style={{ left: `${minRangePercent}%`, right: `${maxRangePercent}%` }}
          ></div>
        </div>

        <div className={styles.rangeInputs}>
          <input
            type="range"
            className={styles.input}
            value={minRange}
            min={filterData.limitMin}
            max={filterData.limitMax}
            step={GAP_PRICE}
            onChange={(e) => changeRange(true, e.target.value)}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
          />
          <input
            type="range"
            className={styles.input}
            value={maxRange}
            min={filterData.limitMin}
            max={filterData.limitMax}
            step={GAP_PRICE}
            onChange={(e) => changeRange(false, e.target.value)}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
          />
        </div>
      </div>
    </div>
  )
}

export default PriceContent
