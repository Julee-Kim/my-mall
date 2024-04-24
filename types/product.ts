export interface Category {
  id: string
  name: string
  category?: Category[]
}

export interface CategoryListProps {
  categories: Category[]
  activeId: string
  isTop: boolean
  handleClick: (category: Category, from: FromClickType) => void
}

export interface GetInitDataReturnType {
  categoryName: string
  topId: string
  subId: string
  subList: Category[] | []
}

export type FromClickType = 'subMenu' | 'lnb'

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
