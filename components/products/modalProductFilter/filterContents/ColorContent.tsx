import Image from 'next/image'
import { IFilterColor, IFilterItem } from '@/types/filter'
import { comma } from '@/utils'
import styles from './ColorContent.module.scss'

const ColorContent = ({ filterData }: { filterData: IFilterColor }) => {
  return (
    <ul className={styles.colorList}>
      {filterData.list.map((color: IFilterItem) => (
        <li key={color.code}>
          <button className={styles.btnColor}>
            <div className={styles.colorWrap}>
              <div className={styles.color}>
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
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ColorContent
