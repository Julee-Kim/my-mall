import { Metadata } from 'next'
import HeaderContainer from '@/components/header/HeaderContainer'

export const metadata: Metadata = { title: '상품 목록' }

async function getData(params: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${params.page}&size=${params.size}`
  const res = await fetch(url, params)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Products({ params }: { params: { id: string } }) {
  const { id: activeId } = params
  const data = await getData({ page: 2, size: 2 })

  return (
    <div>
      <HeaderContainer activeId={activeId} />
    </div>
  )
}
