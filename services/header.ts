import {
  ICategoriesData,
  IFetchCategoriesRes,
  IMenuBarList,
  IDivideToTobSubReturn,
  ITopCategoryListItem,
} from '@/types/category'

export const divideToTobSub = (
  activeTopId: string,
  activeSubId: string,
  list: ICategoriesData[],
): IDivideToTobSubReturn => {
  let name = ''
  let topId = ''
  let subId = ''
  let topList: ITopCategoryListItem[] = []
  let subList: IMenuBarList = {}

  for (const topItem of list) {
    if (activeTopId === topItem.id) {
      topId = topItem.id
      name = topItem.name
    }

    topList.push(topItem)

    let subArr = []
    for (const subItem of topItem.category) {
      if (activeSubId === subItem.id) {
        topId = topItem.id
        subId = subItem.id
        name = subItem.name
      }

      subArr.push({ topId: topItem.id, ...subItem })
    }

    subList[topItem.id] = [{ topId: topItem.id, id: topItem.id, name: '전체' }, ...subArr]
  }

  if (!subId) {
    subId = topId
  }

  return {
    name,
    topId,
    subId,
    topList,
    subList,
  }
}

export const fetchCategories = async (): Promise<IFetchCategoriesRes> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
