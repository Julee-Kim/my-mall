import { ChangeEvent, useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { CiSearch } from 'react-icons/ci'
import Button from '@/components/_common/button/Button'
import styles from '@/components/products/modalProductFilter/filterContents/SearchBrand.module.scss'

const SearchBrand = () => {
  const [keyword, setKeyword] = useState<string>('')

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="브랜드명 입력"
        className={styles.input}
        value={keyword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
      />
      <div className={styles.btnWrap}>
        {keyword && (
          <Button
            icon={<TiDelete size={28} color={'#ddd'} />}
            className={[styles.btn, styles.btnClear].join(' ')}
          />
        )}
        <Button
          icon={<CiSearch size={18} />}
          className={[styles.btn, styles.btnSearch].join(' ')}
        />
      </div>
    </div>
  )
}

export default SearchBrand
