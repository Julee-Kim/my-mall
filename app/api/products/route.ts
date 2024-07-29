import { NextRequest, NextResponse } from 'next/server'
import { where } from 'firebase/firestore'
import {
  createQueryConstraints,
  getBrandNames,
  getOrdinaryAtPosition,
  getProductCount,
  getProductList,
} from './utils'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const page = Number(params.get('page'))
  const size = Number(params.get('size'))
  const startIndex = size * (page - 1)

  const queryConstraints = createQueryConstraints(params)

  const brand = params.get('brand')
  const brandArr = brand?.split(',') ?? []
  if (brandArr.length > 0) {
    const brandNameList = await getBrandNames(brandArr)
    queryConstraints.push(where('brand_eng', 'in', brandNameList))
  }

  // 모든 상품의 수
  const total = await getProductCount(queryConstraints)
  // 요청 할 시작인덱스(ordinary)
  const ordinaryAtStartIndex = await getOrdinaryAtPosition(startIndex)
  // 상품 목록
  const list = await getProductList(queryConstraints, startIndex, size, ordinaryAtStartIndex)

  const res = {
    ok: true,
    page,
    size,
    total,
    list,
  }
  return NextResponse.json(res)
}
