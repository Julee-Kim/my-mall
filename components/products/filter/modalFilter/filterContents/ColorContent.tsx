import Image from 'next/image'
import { IFilterItem, ISelectedFilter } from '@/types/filter'
import { useFilterStore } from '@/store/filter'
import { FILTER_CODE } from '@/constants/filter'
import { comma } from '@/utils'
import Checkbox from '@/components/_common/checkbox/Checkbox'
import styles from './ColorContent.module.scss'

const ColorContent = ({ filterData }: { filterData: IFilterItem[] }) => {
  const { isActiveColorTab, setIsActiveColorTab, selectedFilters, setSelectedFilters } =
    useFilterStore()

  const isActive = (code: string | number) => {
    return selectedFilters.some((item: ISelectedFilter) => item.code === code)
  }

  const addFilter = (item: IFilterItem) => {
    if (!isActiveColorTab) {
      setIsActiveColorTab(true)
    }

    setSelectedFilters([
      ...selectedFilters,
      {
        type: FILTER_CODE.color,
        code: item.code,
        name: item.name,
      },
    ])
  }

  const deleteFilter = (item: IFilterItem) => {
    let hasNoColor = true
    const newArr: ISelectedFilter[] = []

    for (const filter of selectedFilters) {
      if (filter.code !== item.code) {
        newArr.push(filter)

        if (filter.type === FILTER_CODE.color) {
          hasNoColor = false
        }
      }
    }

    if (hasNoColor) {
      setIsActiveColorTab(false)
    }

    setSelectedFilters(newArr)
  }

  return (
    <ul className={styles.colorList}>
      {filterData.map((color: IFilterItem) => (
        <li key={color.code} className={styles.btnColor}>
          <Checkbox
            checked={isActive(color.code)}
            isShowIcon={false}
            onChange={(e) => (e.target.checked ? addFilter(color) : deleteFilter(color))}
          >
            <div className={styles.colorWrap}>
              <div className={[styles.color, isActive(color.code) ? styles.active : ''].join(' ')}>
                <Image
                  src={`/images/color/color_${color.code}.png`}
                  width={100}
                  height={100}
                  alt={color.name}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
            <p className={styles.name}>{color.name}</p>
            <span className={styles.count}>({comma(color.count)})</span>
          </Checkbox>
        </li>
      ))}
    </ul>
  )
}

export default ColorContent
