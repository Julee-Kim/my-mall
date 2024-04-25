'use client'

import { useState, useRef, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { IFetchProductsRes, IProduct } from '@/types/product'
import { useProductStore } from '@/store/product'
import Product from './Product'
import styles from './ProductList.module.scss'

const _size = 6

const ProductList = ({ id }: { id: string }) => {
  const [page, setPage] = useState<number>(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const trigger = useRef<HTMLSpanElement>(null)

  const [products, setProducts] = useProductStore(
    useShallow((state) => [state.products, state.setProducts]),
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entries[0].isIntersecting && trigger.current) {
          observer.unobserve(trigger.current)
          setIsLoading(true)

          try {
            const res: IFetchProductsRes = await fetchProducts({ page: page + 1, size: _size, id })
            if (res.list.length !== 0) {
              setProducts([...products, ...res.list])
              setPage((prev) => prev + 1)
            } else {
              setIsLastPage(true)
            }
            setIsLoading(false)
          } catch (e) {
            console.log(e)
          }
        }
      },
      { threshold: 0.5 },
    )

    if (trigger.current) {
      observer.observe(trigger.current)
    }

    // onUnMounted
    return () => observer.disconnect()
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
      <ul className={styles.list}>
        {products.map((product: IProduct, index: number) => (
          <Product key={index} product={product} page={page} />
        ))}
      </ul>
      {/* TODO. 'Loading' 텍스트를 대체할 스켈레톤 필요 */}
      {!isLastPage && <span ref={trigger}>Loading</span>}
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
