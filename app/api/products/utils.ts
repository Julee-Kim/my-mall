import {
  collection,
  getDocs,
  where,
  query,
  and,
  getCountFromServer,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import fireStore from '@/firebase/firestore'

// 브랜드 목록
export async function getBrandNames(brandIdArr: string[]) {
  // id 기준으로 브랜드 목록 생성
  const brandRef = query(collection(fireStore, 'brand'), where('id', 'in', brandIdArr))
  const brandSnap = await getDocs(brandRef)
  const brandList = brandSnap.docs.map((doc) => doc.data())
  return brandList.map((item) => item.eng_name)
}

// params에 따라서 쿼리 조건을 만들기
export function createQueryConstraints(params: URLSearchParams) {
  const categoryTop = params.get('categoryTop')
  const categorySub = params.get('categorySub')
  const color = params.get('color')
  const discount = params.get('discount')
  const price = params.get('price')
  const benefit = params.get('benefit')

  const benefitArr = benefit?.split(',') ?? []
  const discountArr = discount?.split(',') ?? []
  const colorArr = color?.split(',') ?? []

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

  return queryConstraints
}

// 전체 제품 개수
export async function getProductCount(queryConstraints: any) {
  const collectionRef = query(collection(fireStore, 'products'), and(...queryConstraints))
  const snapshot = await getCountFromServer(collectionRef)
  return snapshot.data().count
}

// 요청 페이지의 시작인덱스(ordinary) 구하기
export async function getOrdinaryAtPosition(startIndex: number) {
  // 첫 번째 페이지의 경우 null 반환
  if (startIndex === 0) return null

  // startIndex까지 문서 검색
  const docRef = query(collection(fireStore, 'products'), orderBy('ordinary'), limit(startIndex))

  const docSnap = await getDocs(docRef)

  if (docSnap.empty) return null

  const lastDoc = docSnap.docs[docSnap.docs.length - 1]

  return lastDoc.data().ordinary
}

// 상품 목록
export async function getProductList(
  queryConstraints: any[],
  startIndex: number,
  size: number,
  lastOrdinary?: number,
) {
  const startConstraint = startIndex === 0 ? [] : [startAfter(lastOrdinary ?? 0)]

  const docRef = query(
    collection(fireStore, 'products'),
    orderBy('ordinary'),
    ...queryConstraints,
    ...startConstraint,
    limit(size),
  )

  const docSnap = await getDocs(docRef)
  return docSnap.docs.map((doc) => doc.data())
}
