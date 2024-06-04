import { Metadata } from 'next'
import HeaderContainer from '@/components/header/HeaderContainer'
import ProductList from '@/components/products/productList/ProductList'
import Filter from '@/components/products/filter/Filter'

export const metadata: Metadata = { title: '상품 목록' } as const

const Products = async ({
  searchParams,
}: {
  searchParams: { categoryTop: string; categorySub: string }
}) => {
  const { categoryTop, categorySub } = searchParams

  return (
    <div>
      <HeaderContainer activeTopId={categoryTop} activeSubId={categorySub} />
      <Filter />
      <ProductList topId={categoryTop} subId={categorySub} />
    </div>
  )
}

export default Products
