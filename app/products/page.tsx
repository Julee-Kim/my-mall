import { Metadata } from 'next'
import Header from '@/components/header/Header'
import ButtonBack from '@/components/header/ButtonBack'
import ButtonCart from '@/components/header/ButtonCart'
import ButtonCategoryTitle from '@/components/header/ButtonCategoryTitle'

export const metadata: Metadata = { title: '상품 목록' }

async function getData(params: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${params.page}&size=${params.size}`
  const res = await fetch(url, params)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Products() {
  const data = await getData({ page: 2, size: 2 })

  return (
    <main>
      <Header>
        <ButtonBack />
        <ButtonCategoryTitle />
        <ButtonCart />
      </Header>
    </main>
  )
}
