export interface ICategory {
  id: string
  name: string
  category?: ICategory[]
}

export interface ICategoryListProps {
  categories: ICategory[]
  activeId: string
  isTop: boolean
  handleClick: (category: ICategory) => void
}

export interface IGetInitDataReturnType {
  categoryName: string
  topId: string
  subId: string
  subList: ICategory[] | []
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

export interface ITab {
  id: string
  name: string
}
