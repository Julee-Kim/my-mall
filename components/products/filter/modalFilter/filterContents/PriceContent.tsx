import { ChangeEvent, useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { IFilterPrice } from '@/types/filter'
import { initialFilterPrice } from '@/constants/filter'
import styles from '@/components/products/filter/modalFilter/filterContents/PriceContent.module.scss'

const GAP_PRICE = 1000

const PriceContent = ({
  filterData = initialFilterPrice,
  onChange,
}: {
  filterData: IFilterPrice
  onChange: (min: number, max: number) => void
}) => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [minRange, setMinRange] = useState(0)
  const [maxRange, setMaxRange] = useState(0)
  const [minRangePercent, setMinRangePercent] = useState(0)
  const [maxRangePercent, setMaxRangePercent] = useState(0)

  useEffect(() => {
    setMinMaxValue(filterData.limitMin, filterData.limitMax)
  }, [])

  const setMinMaxValue = (min: number, max: number) => {
    setMinValue(min)
    setMaxValue(max)
    setMinRange(min)
    setMaxRange(max)
  }

  const changeRange = (isMin: boolean, isRange: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (isMin) {
      if (isRange) setMinValue(value)
      setMinRange(value)
    } else {
      if (isRange) setMaxValue(value)
      setMaxRange(value)
    }
    checkMinMax()
  }

  const checkMinMax = () => {
    if (maxRange - minRange < GAP_PRICE) {
      setMaxRange(minRange + GAP_PRICE)
      setMinRange(maxRange - GAP_PRICE)
    } else {
      setMinRangePercent((minRange / filterData.limitMax) * 100)
      setMaxRangePercent(100 - (maxRange / filterData.limitMax) * 100)
    }
  }

  const blurInput = (e: ChangeEvent<HTMLInputElement>, isMin: boolean) => {
    changeRange(isMin, false)(e)
    onChange(minValue, maxValue)
  }

  const handleMouseUp = () => {
    onChange(minValue, maxValue)
  }

  return (
    <div>
      <h4 className={styles.title}>가격 범위 설정</h4>
      <p className={styles.desc}>가격은 천원단위로 입력해주세요.</p>
      <div className={styles.inputWrap}>
        <input
          type="text"
          className={styles.input}
          value={minValue}
          onChange={(e) => setMinValue(parseInt(e.target.value))}
          onBlur={(e) => blurInput(e, true)}
        />
        <span className={styles.between}>~</span>
        <input
          type="text"
          className={styles.input}
          value={maxValue}
          onChange={(e) => setMaxValue(parseInt(e.target.value))}
          onBlur={(e) => blurInput(e, false)}
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
            max={filterData.limitMax - GAP_PRICE}
            step={GAP_PRICE}
            onChange={(e) => changeRange(true, true)(e)}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
          />
          <input
            type="range"
            className={styles.input}
            value={maxRange}
            min={filterData.limitMin + GAP_PRICE}
            max={filterData.limitMax}
            step={GAP_PRICE}
            onChange={(e) => changeRange(false, true)(e)}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
          />
        </div>
      </div>
    </div>
  )
}

export default PriceContent
