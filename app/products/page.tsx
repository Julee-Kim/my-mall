import { Metadata } from 'next'
import HeaderContainer from '@/components/headerContainer/HeaderContainer'
import ProductList from '@/components/products/productList/ProductList'
import Filter from '@/components/products/filter/Filter'
import { IProductListParams } from '@/types/product'

export const metadata: Metadata = { title: '상품 목록' } as const

const Products = async ({ searchParams }: { searchParams: IProductListParams }) => {
  const { categoryTop, categorySub } = searchParams

  return (
    <div>
      <HeaderContainer activeTopId={categoryTop} activeSubId={categorySub} />
      <Filter />
      <ProductList />
    </div>
  )
}

export default Products
