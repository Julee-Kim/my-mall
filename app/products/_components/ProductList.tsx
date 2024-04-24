'use client'

import { useState, useRef, useEffect } from 'react'
import { IFetchProductsRes, IProduct } from '@/types/product'
import Product from './Product'
import styles from './ProductList.module.scss'

const ProductList = ({ id }: { id: string }) => {
  const [page, setPage] = useState<number>(0)
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLastPage, setIsLastPage] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const trigger = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entries[0].isIntersecting && trigger.current) {
          observer.unobserve(trigger.current)
          setIsLoading(true)

          try {
            const res: IFetchProductsRes = await fetchProducts({ page: page + 1, size: 5, id })
            if (res.list.length !== 0) {
              setProducts((prev: IProduct[]) => [...prev, ...res.list])
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

  return (
    <div>
      <ul className={styles.list}>
        {products.map((product: IProduct, index: number) => (
          <Product product={product} key={index} />
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
