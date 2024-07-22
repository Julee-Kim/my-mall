import { NextRequest } from 'next/server'
import {
  collection,
  getDocs,
  limit,
  query,
  startAt,
  orderBy,
  where,
  or,
  and,
} from 'firebase/firestore'
import fireStore from '@/firebase/firestore'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  console.log('params', params)

  const page = Number(params.get('page'))
  const size = Number(params.get('size'))
  const categoryTop = params.get('categoryTop')
  const categorySub = params.get('categorySub')
  const color = params.get('color')
  const discount = params.get('discount')
  const startIndex = size * (page - 1)
  const price = params.get('price')
  const benefit = params.get('benefit')
  const brand = params.get('brand')

  const benefitArr = benefit?.split(',') ?? []
  const discountArr = discount?.split(',') ?? []
  const colorArr = color?.split(',') ?? []
  const brandArr = brand?.split(',') ?? []

  const queryConstraints = []

  if (categoryTop) queryConstraints.push(where('top_category', '==', categoryTop))
  if (categorySub) queryConstraints.push(where('category', '==', categorySub))

  if (colorArr.length > 0) queryConstraints.push(where('color', 'in', colorArr))
  if (discountArr) {
    if (discountArr.includes('coupon')) queryConstraints.push(where('is_coupon', '==', true))
    if (discountArr.includes('is_sale')) queryConstraints.push(where('is_sale', '==', true))
  }
  if (benefitArr) {
    if (benefitArr.includes('exclusive')) queryConstraints.push(where('is_exclusive', '==', true))
    if (benefitArr.includes('freeDelivery'))
      queryConstraints.push(where('is_free_delivery', '==', true))
  }
  if (price) {
    const priceMax = Number(price.split(',')[1])
    const priceMin = Number(price.split(',')[0])
    queryConstraints.push(where('final_price', '<=', priceMax))
    queryConstraints.push(where('final_price', '>=', priceMin))
  }
  if (brandArr.length > 0) {
    const brandRef = query(collection(fireStore, 'brand'), where('id', 'in', brandArr))
    const brandSnap = await getDocs(brandRef)
    const brandList = brandSnap.docs.map((doc) => doc.data())
    let brandNameList: string[] = []
    brandList.map((item) => brandNameList.push(item.eng_name))
    queryConstraints.push(where('brand_eng', 'in', brandNameList))
  }

  const docRef = query(
    collection(fireStore, 'products'),
    orderBy('ordinary'),
    and(...queryConstraints),
    startAt(startIndex),
    limit(size),
  )
  const docSnap = await getDocs(docRef)
  const list = docSnap.docs.map((doc) => doc.data())

  const res = {
    ok: true,
    page,
    size,
    total: list.length,
    list,
  }
  return Response.json(res)
}
