import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { CiSearch } from 'react-icons/ci'
import { ISearchBrand } from '@/types/filter'
import Button from '@/components/_common/button/Button'
import styles from '@/components/products/filter/modalFilter/filterContents/SearchBrand.module.scss'

const SearchBrand = ({ searchKeyword, onSorting }: ISearchBrand) => {
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    setKeyword(searchKeyword)
  }, [])

  const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSorting(keyword)
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="브랜드명 입력"
        className={styles.input}
        value={keyword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => enterInput(e)}
      />
      <div className={styles.btnWrap}>
        {keyword && (
          <Button
            icon={<TiDelete size={28} color={'#ddd'} />}
            className={[styles.btn, styles.btnClear].join(' ')}
            onClick={() => setKeyword('')}
          />
        )}
        <Button
          icon={<CiSearch size={18} />}
          className={[styles.btn, styles.btnSearch].join(' ')}
          onClick={() => onSorting(keyword)}
        />
      </div>
    </div>
  )
}

export default SearchBrand
