import { Metadata } from 'next'
import HeaderContainer from '@/components/header/HeaderContainer'
import ProductList from '@/app/products/_components/ProductList'

export const metadata: Metadata = { title: '상품 목록' } as const

const Products = async ({ searchParams }: { searchParams: { category: string } }) => {
  const { category: activeId } = searchParams

  return (
    <div>
      <HeaderContainer activeId={activeId} />
      <ProductList id={activeId} />
    </div>
  )
}

export default Products
