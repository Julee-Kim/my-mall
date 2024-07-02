import Image from 'next/image'
import { IColorContentProps, IFilterDataItem } from '@/types/filter'
import { comma } from '@/utils'
import Checkbox from '@/components/_common/checkbox/Checkbox'
import styles from './ColorContent.module.scss'

const ColorContent = ({ filterData, onAdd, onDelete }: IColorContentProps) => {
  return (
    <ul className={styles.colorList}>
      {filterData.map((color: IFilterDataItem) => (
        <li key={color.code} className={styles.btnColor}>
          <Checkbox
            checked={color.isActive}
            isShowIcon={false}
            className={styles.colorCheckbox}
            onChange={(e) => {
              e.target.checked ? onAdd(color.type, color) : onDelete(color.type, color.code)
            }}
          >
            <div className={styles.colorWrap}>
              <div className={[styles.color, color.isActive ? styles.active : ''].join(' ')}>
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
