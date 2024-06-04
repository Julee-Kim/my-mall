'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { IProduct } from '@/types/product'
import { fetchProducts } from '@/services/products'
import Product from '@/components/products/productList/product/Product'
import Observer from '@/components/_common/observer/Observer'
import SkeletonProductList from '@/components/products/skeletonProductList/SkeletonProductList'
import styles from './ProductList.module.scss'

const PAGE_SIZE = 6

const ProductList = ({ topId, subId }: { topId: string; subId: string }) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['products'],
    initialPageParam: 1,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchProducts({ page: pageParam, size: PAGE_SIZE, topId, subId }),
    select: (data) => {
      return {
        pageParams: data.pageParams,
        pages: data.pages,
        currentPage: data.pageParams.length,
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        const { page, size, total } = lastPage
        return page * size < total ? page + 1 : undefined
      }
    },
  })

  const loadMore = async () => {
    await fetchNextPage()
  }

  return (
    <div>
      <ul className={[styles.list, data?.pages.length && styles.bottomGap].join(' ')}>
        {data?.pages.map((page) =>
          page.list.map((product: IProduct, index: number) => (
            <Product key={index} product={product} />
          )),
        )}
      </ul>
      {(isLoading || hasNextPage) && (
        <Observer onEnter={loadMore} options={{ threshold: 0.25 }}>
          <SkeletonProductList />
        </Observer>
      )}
    </div>
  )
}

export default ProductList
