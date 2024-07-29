import { NextRequest } from 'next/server'
import { fetchData } from './fetchData'
import { IBrand, ICounters } from './interfaces'
import { colorStr } from './constants'
import {
  addToBrandList,
  updateBrandList,
  updateColorMap,
  updateCounters,
  updatePriceLimits,
} from './utils'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  let brandList: IBrand[] = [] // 브랜드 - 전체
  let topBrandList: IBrand[] = [] // 브랜드 - 인기
  let newBrandList: IBrand[] = [] // 브랜드 - 신규

  // 할인, 혜택 항목의 수
  let counters: ICounters = {
    numSales: 0, // 세일중
    numCoupons: 0, // 상품쿠폰
    numExclusive: 0, // 단독상품
    numFreeDelivery: 0, // 무료배송
  }

  let numMinMax = 0 // min, max 범위에 포함되는 상품의 개수 (for total)
  let limitMin = Number.MAX_VALUE
  let limitMax = Number.MIN_VALUE
  let colorMap = new Map()

  try {
    // 모든 상품 데이터를 필터 데이터 생성에 사용
    let data = await fetchData(params)

    colorStr.forEach((value, key) => colorMap.set(key, 0))

    data['products'].forEach((item: any) => {
      // 브랜드 목록
      updateBrandList(item, brandList, data)
      // 할인, 혜택 항목의 수 카운팅
      updateCounters(item, counters)

      // 가격
      const result = updatePriceLimits(item, limitMin, limitMax, numMinMax)
      limitMin = result.limitMin
      limitMax = result.limitMax
      numMinMax = result.numMinMax

      // 컬러
      updateColorMap(item, colorMap)
    })

    // 브랜드 > 인기
    addToBrandList(brandList, data.topBrand, topBrandList, '단독')
    // 브랜드 > 신규
    addToBrandList(brandList, data.newBrand, newBrandList, '단독')

    data['brand'] = brandList
    data['topBrand'] = topBrandList
    data['newBrand'] = newBrandList

    // 할인
    data['discount'] = [
      {
        code: 'coupon',
        name: '상품 쿠폰',
        count: counters.numCoupons,
      },
      {
        code: 'sale',
        name: '세일중',
        count: counters.numSales,
      },
    ]

    // 혜택
    data['benefit'] = [
      {
        code: 'exclusive',
        name: '단독상품',
        count: counters.numExclusive,
      },
      {
        code: 'freeDelivery',
        name: '무료배송',
        count: counters.numFreeDelivery,
      },
    ]

    // 가격
    data['price'] = {
      count: numMinMax,
      limitMin,
      limitMax,
    }

    let colorData: any = []
    colorMap.forEach((value, key) => {
      colorData.push({ code: key, name: colorStr.get(key), count: value })
    })
    data['color'] = colorData

    const { products, ...newData } = data

    const response = {
      ok: true,
      data: newData,
      total: products.length,
    }

    return Response.json(response)
  } catch (error) {
    console.error('Error fetching data: ', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
