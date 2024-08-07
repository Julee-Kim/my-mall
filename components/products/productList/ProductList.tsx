'use client'

import { IProduct } from '@/types/product'
import useProductListQuery from '@/hooks/_queries/useProductListQuery'
import Product from '@/components/products/productList/product/Product'
import Observer from '@/components/_common/observer/Observer'
import SkeletonProductList from '@/components/products/skeletonProductList/SkeletonProductList'
import styles from './ProductList.module.scss'

const ProductList = () => {
  const { data, fetchNextPage, isLoading, hasNextPage } = useProductListQuery()

  if (isLoading) {
    return (
      <div className={styles.listWrap}>
        <SkeletonProductList />
      </div>
    )
  }

  const loadMore = async () => {
    await fetchNextPage()
  }

  return (
    <div className={styles.listWrap}>
      <ul className={[styles.list, data?.pages.length && styles.bottomGap].join(' ')}>
        {data?.pages.map((page) =>
          page.list.map((product: IProduct, index: number) => (
            <Product key={index} product={product} />
          )),
        )}
      </ul>
      {hasNextPage && (
        <Observer onEnter={loadMore} options={{ threshold: 0.25 }}>
          <SkeletonProductList />
        </Observer>
      )}
    </div>
  )
}

export default ProductList
