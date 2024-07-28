import { IBrand, ICounterItem, ICounters } from './interfaces'

// 브랜드 목록
export function updateBrandList(item: any, brandList: IBrand[], data: { [key: string]: any[] }) {
  const brandObj = brandList.find((brand) => brand.eng_name === item['brand_eng'])
  if (brandObj) {
    // 이미 존재하면 카운트 증가
    brandObj.count += 1
  } else {
    // 없을 경우, brand 정보에서 brand_eng를 기준으로 정보를 찾고 브랜드를 추가한다.
    const brandInfo = data['brand'].find((brand: any) => brand.eng_name === item['brand_eng'])
    if (brandInfo) {
      brandList.push({
        code: Number(brandInfo.id),
        name: item.brand,
        eng_name: item['brand_eng'],
        count: 1,
        tags: [],
      })
    }
  }
}

// 할인, 혜택의 항목 수 카운팅
export function updateCounters(item: ICounterItem, counters: ICounters) {
  if (item.is_sale) counters.numSales++
  if (item.is_coupon) counters.numCoupons++
  if (item.is_exclusive) counters.numExclusive++
  if (item.is_free_delivery) counters.numFreeDelivery++
}

// 가격 필터
export function updatePriceLimits(
  item: any,
  limitMin: number,
  limitMax: number,
  numMinMax: number, // min, max 범위에 포함되는 상품의 개수
) {
  let price = item['final_price']

  if (limitMin > price) {
    limitMin = Math.floor(price / 1000) * 1000
  }
  if (limitMax < price) {
    limitMax = Math.floor(price / 1000) * 1000
  }

  if (limitMin <= price && limitMax >= price) numMinMax++

  return { limitMin, limitMax, numMinMax }
}

// 컬러
export function updateColorMap(item: any, colorMap: Map<string, number>) {
  let colorCode = item['color']
  if (colorMap.has(colorCode)) {
    let numColors = colorMap.get(colorCode)!
    numColors++
    colorMap.set(colorCode, numColors)
  } else {
    colorMap.set(colorCode, 1)
  }
}

// brandList에 인기(topBrand), 신규(newBrand) 값 추가
export function addToBrandList(brandList: any[], dataList: any[], targetList: any[], tag: string) {
  brandList.forEach((item) => {
    const brandInfo = dataList.find((brand) => Number(brand.id) === item.code)
    if (brandInfo) {
      if (!targetList.some((brand) => brand.code === brandInfo.id)) {
        targetList.push({
          code: Number(brandInfo.id),
          name: item.name,
          eng_name: item.eng_name,
          count: item.count,
          tags: [tag],
        })
      }
    }
  })
}
