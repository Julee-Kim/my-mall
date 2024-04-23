export interface Category {
  id: string
  name: string
  category?: Category[]
}

export interface CategoryListProps {
  categories: Category[]
  activeId: string
  isTop: boolean
  handleClick: (category: any) => void
}

export interface GetInitDataReturnType {
  categoryName: string
  topId: string
  subId: string
  subList: Category[] | []
}
