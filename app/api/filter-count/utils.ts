import fireStore from '@/firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IFilterData } from './interfaces'

// brand 콜렉션 요청
export async function getBrandNames(brandArr: string[]): Promise<string[]> {
  const brandRef = query(collection(fireStore, 'brand'), where('id', 'in', brandArr))
  const brandSnap = await getDocs(brandRef)
  const brandList = brandSnap.docs.map((doc) => doc.data())
  return brandList.map((item) => item.eng_name)
}

// 조건에 부합하는 상품 콜렉션 요청
export async function getFilteredProducts(queryConstraints: any[]) {
  const docRef = query(collection(fireStore, 'products'), ...queryConstraints)
  const docSnap = await getDocs(docRef)
  return docSnap.docs.map((doc) => doc.data())
}

// data에 따라서 쿼리 조건을 만들기
export async function createQueryConstraints(data: IFilterData) {
  const { price, color, discount, benefit, brand, categoryTop, categorySub } = data

  const colorArr = color?.toString().split(',') ?? []
  const queryConstraints = []

  if (categoryTop) queryConstraints.push(where('top_category', '==', categoryTop))
  if (categorySub) queryConstraints.push(where('category', '==', categorySub))
  if (colorArr.length > 0) queryConstraints.push(where('color', 'in', colorArr))
  if (price) {
    queryConstraints.push(where('final_price', '<=', price.max))
    queryConstraints.push(where('final_price', '>=', price.min))
  }
  if (discount) {
    if (discount.includes('coupon')) queryConstraints.push(where('is_coupon', '==', true))
    if (discount.includes('sale')) queryConstraints.push(where('is_sale', '==', true))
  }
  if (benefit) {
    if (benefit.includes('exclusive')) queryConstraints.push(where('is_exclusive', '==', true))
    if (benefit.includes('freeDelivery'))
      queryConstraints.push(where('is_free_delivery', '==', true))
  }
  if (brand) {
    const brandNameList = await getBrandNames(brand.map(String))
    queryConstraints.push(where('brand_eng', 'in', brandNameList))
  }

  return queryConstraints
}
