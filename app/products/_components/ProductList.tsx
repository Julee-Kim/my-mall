'use client'

import { useState, useEffect, useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { IFetchProductsRes, IProduct } from '@/types/product'
import { useProductStore } from '@/store/product'
import Observer from '@/components/_common/observer/Observer'
import Product from './Product'
import SkeletonProductList from '@/app/products/_components/SkeletonProductList'
import styles from './ProductList.module.scss'

const _size = 6 // page size

const ProductList = ({ id }: { id: string }) => {
  const [page, setPage] = useState<number>(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [products, setProducts] = useProductStore(
    useShallow((state) => [state.products, state.setProducts]),
  )

  const loadMore = useCallback(async () => {
    setIsLoading(true)

    try {
      const res: IFetchProductsRes = await fetchProducts({ page: page + 1, size: _size, id })
      if (res.list.length !== 0) {
        setProducts([...products, ...res.list])
        setPage((prev) => prev + 1)

        // TODO. 아래 로직 문제 확인 원인 필요
        // console.log('products.length ', products.length)
        // if (products.length === res.total) {
        //   setIsLastPage(true)
        // }
      } else {
        setIsLastPage(true)
      }
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }, [page])

  useEffect(() => {
    // 페이지 이동 후 저장되어 있던 위치로 스크롤 복원
    const _scroll = sessionStorage.getItem('__next_scroll_list')

    if (_scroll) {
      const { page, x, y } = JSON.parse(_scroll)
      window.scrollTo(x, y)

      // TODO. 리로드 했을 경우도 대비하고 싶음. 페이지 이탈 전 현재 스크롤 위치를 저장 하는 방법을 찾아야함..

      sessionStorage.removeItem('__next_scroll_list')
    }
  }, [])

  return (
    <div>
      <ul className={[styles.list, products.length && styles.bottomGap].filter(Boolean).join(' ')}>
        {products.map((product: IProduct, index: number) => (
          <Product key={index} product={product} page={page} />
        ))}
      </ul>
      {!isLastPage && (
        <Observer onEnter={loadMore} options={{ threshold: 0.25 }}>
          <SkeletonProductList />
        </Observer>
      )}
    </div>
  )
}

const fetchProducts = async (params: {
  page: number
  size: number
  id: string
}): Promise<IFetchProductsRes> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${params.page}&size=${params.size}`
  const res = await fetch(url, params)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default ProductList
