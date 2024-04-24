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
