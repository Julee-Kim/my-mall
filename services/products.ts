import { IFetchProductsRes } from '@/types/product'

export const fetchProducts = async (params: {
  page: number
  size: number
  id: string
}): Promise<IFetchProductsRes> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${params.page}&size=${params.size}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
