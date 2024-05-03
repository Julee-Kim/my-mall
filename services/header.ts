import { ICategory, IGetInitDataReturnType } from '@/types/product'

export const getCategoryData = (list: ICategory[], targetId: string): IGetInitDataReturnType => {
  for (const topCategory of list) {
    if (targetId === topCategory.id) {
      return {
        categoryName: topCategory.name,
        topId: topCategory.id,
        subId: topCategory.id,
        subList: topCategory.category || [],
      }
    }

    if (topCategory.category) {
      for (const subCategory of topCategory.category) {
        if (subCategory.id === targetId) {
          return {
            categoryName: subCategory.name,
            topId: topCategory.id,
            subId: subCategory.id,
            subList: topCategory.category || [],
          }
        }
      }
    }
  }

  return {
    categoryName: '',
    topId: '',
    subId: '',
    subList: [],
  }
}
