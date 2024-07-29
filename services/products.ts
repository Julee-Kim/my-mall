import { IFetchProductsRes, IProductListParams } from '@/types/product'
import { paramsToString } from '@/utils/queryParams'

export const fetchProducts = async (params: IProductListParams): Promise<IFetchProductsRes> => {
  const queryString = paramsToString({ ...params })
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryString}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
