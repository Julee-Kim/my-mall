export interface IProduct {
  brand: string
  brand_eng: string
  category: string
  color: string
  customer_price: number
  discount: number
  final_price: number
  img: string
  is_coupon: boolean
  is_exclusive: boolean
  is_free_delivery: boolean
  is_sale: boolean
  name: string
  ordinary: number
  top_category: string
}

export interface IFetchProductsRes {
  ok: boolean
  page: number
  size: number
  total: number
  list: IProduct[]
}

type TTabId<T> = T extends infer R ? R : string

export interface ITab<T> {
  id: TTabId<T>
  name: string
  isDot?: boolean
}
