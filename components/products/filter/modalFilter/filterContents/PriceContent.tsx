import { ChangeEvent, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { IFilterPrice } from '@/types/filter'
import styles from '@/components/products/filter/modalFilter/filterContents/PriceContent.module.scss'

const MIN_PRICE = 1000
const MAX_PRICE = 400000
const GAP_PRICE = 1000

const PriceContent = ({ filterData }: { filterData: IFilterPrice }) => {
  const [minValue, setMinValue] = useState(MIN_PRICE)
  const [maxValue, setMaxValue] = useState(MAX_PRICE)
  const [minRange, setMinRange] = useState(MIN_PRICE)
  const [maxRange, setMaxRange] = useState(MAX_PRICE)
  const [minRangePercent, setMinRangePercent] = useState(0)
  const [maxRangePercent, setMaxRangePercent] = useState(0)

  const blueMinInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMinRange(parseInt(e.target.value))
    checkMinMax()
  }

  const blueMaxInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxRange(parseInt(e.target.value))
    checkMinMax()
  }

  const changeMinRange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setMinValue(value)
    setMinRange(value)
    checkMinMax()
  }

  const changeMaxRange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setMaxValue(value)
    setMaxRange(value)
    checkMinMax()
  }

  const checkMinMax = () => {
    if (maxRange - minRange < GAP_PRICE) {
      setMaxRange(minRange + GAP_PRICE)
      setMinRange(maxRange - GAP_PRICE)
    } else {
      setMinRangePercent((minRange / MAX_PRICE) * 100)
      setMaxRangePercent(100 - (maxRange / MAX_PRICE) * 100)
    }
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
          onBlur={(e) => blueMinInput(e)}
        />
        <span className={styles.between}>~</span>
        <input
          type="text"
          className={styles.input}
          value={maxValue}
          onChange={(e) => setMaxValue(parseInt(e.target.value))}
          onBlur={(e) => blueMaxInput(e)}
        />
        <span className={styles.iconPlusWrap}>
          {maxValue === MAX_PRICE && (
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
            min={MIN_PRICE}
            max={MAX_PRICE - GAP_PRICE}
            step={GAP_PRICE}
            onChange={(e) => changeMinRange(e)}
          />
          <input
            type="range"
            className={styles.input}
            value={maxRange}
            min={MIN_PRICE + GAP_PRICE}
            max={MAX_PRICE}
            step={GAP_PRICE}
            onChange={(e) => changeMaxRange(e)}
          />
        </div>
      </div>
    </div>
  )
}

export default PriceContent
