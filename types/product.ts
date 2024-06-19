export interface IProductListParams {
  page: number | string
  size: number | string
  categoryTop: string
  categorySub?: string
  color?: string
  price?: string
  discount?: string
  benefit?: string
  brand?: string
  topBrand?: string
  newBrand?: string
}

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
