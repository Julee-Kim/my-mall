import { Metadata } from 'next'
import { filters } from '@/constants/filter'
import HeaderContainer from '@/components/header/HeaderContainer'
import ProductList from '@/components/products/ProductList/ProductList'
import ProductFilter from '@/components/products/productFilter/ProductFilter'

export const metadata: Metadata = { title: '상품 목록' } as const

const Products = async ({ searchParams }: { searchParams: { category: string } }) => {
  const { category: activeId } = searchParams

  return (
    <div>
      <HeaderContainer activeId={activeId} />
      <ProductFilter filterData={filters} />
      <ProductList id={activeId} />
    </div>
  )
}

export default Products
