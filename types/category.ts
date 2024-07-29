export interface ICategory {
  id: string
  name: string
}

export interface ICategoriesData extends ICategory {
  category: ICategory[]
}

export interface IFetchCategoriesRes {
  ok: boolean
  data: ICategoriesData[]
}

export interface ITopCategoryListItem extends ICategory {
  category: ICategory[]
}

export interface ISubCategoryListItem extends ICategory {
  topId: string
}

export interface IMenuBarList {
  // key: top category id
  [key: string]: ISubCategoryListItem[]
}

export interface IDivideToTobSubReturn {
  name: string
  topId: string
  subId: string
  topList: ITopCategoryListItem[]
  subList: IMenuBarList
}

export interface ICategoryListProps {
  categories: ITopCategoryListItem[] | ISubCategoryListItem[]
  activeId: string
  isTop: boolean
  handleClick: (category: ITopCategoryListItem | ISubCategoryListItem) => void
}
