// import { NextRequest } from 'next/server'
//
// export async function GET(request: NextRequest) {
//   const data = {
//     color: [
//       {
//         code: 'white',
//         name: '화이트',
//         count: 2348,
//       },
//       {
//         code: 'grey',
//         name: '그레이',
//         count: 384,
//       },
//       {
//         code: 'black',
//         name: '블랙',
//         count: 874,
//       },
//       {
//         code: 'yellow',
//         name: '옐로우',
//         count: 1234,
//       },
//       {
//         code: 'pink',
//         name: '핑크',
//         count: 10,
//       },
//       {
//         code: 'green',
//         name: '그린',
//         count: 765,
//       },
//       {
//         code: 'blue',
//         name: '블루',
//         count: 234,
//       },
//       {
//         code: 'brown',
//         name: '브라운',
//         count: 567,
//       },
//       {
//         code: 'pastel',
//         name: '파스텔',
//         count: 222,
//       },
//       {
//         code: 'pattern',
//         name: '패턴',
//         count: 456,
//       },
//     ],
//     price: {
//       limitMin: 10000,
//       limitMax: 1500000,
//       count: 8,
//     },
//     discount: [
//       {
//         code: 'sale',
//         name: '세일중',
//         count: 8125,
//       },
//       {
//         code: 'coupon',
//         name: '상품 쿠폰',
//         count: 6214,
//       },
//     ],
//     benefit: [
//       {
//         code: 'freeDelivery',
//         name: '무료배송',
//         count: 16415,
//       },
//       {
//         code: 'exclusive',
//         name: '단독상품',
//         count: 1075,
//       },
//     ],
//     brand: [
//       {
//         code: 105001,
//         name: '320쇼룸',
//         eng_name: '320SHOWROOM',
//         count: 29,
//         tags: [],
//       },
//       {
//         code: 100474,
//         name: '삼팔컴온커먼',
//         eng_name: '38comeoncommon',
//         count: 1,
//         tags: [],
//       },
//       {
//         code: 106188,
//         name: '어오트',
//         eng_name: 'A HAUTE',
//         count: 1,
//         tags: [],
//       },
//     ],
//     topBrand: [
//       {
//         code: 106463,
//         name: '아무르 무아르',
//         eng_name: 'Amour moier',
//         count: 86,
//         tags: ['단독'],
//       },
//       {
//         code: 108666,
//         name: '이바나헬싱키',
//         eng_name: 'IvanaHelsinki',
//         count: 83,
//         tags: ['단독'],
//       },
//     ],
//     newBrand: [
//       {
//         code: 113480,
//         name: '제이제이지고트',
//         eng_name: 'JJ JIGOTT',
//         count: 39,
//         tags: [],
//       },
//       {
//         code: 113432,
//         name: '러브엠',
//         eng_name: 'LUV.M by MOJO.S.PHINE',
//         count: 9,
//         tags: [],
//       },
//     ],
//   }
//
//   const res = {
//     ok: true,
//     data,
//     total: 1234,
//   }
//   return Response.json(res)
// }

import { NextRequest } from 'next/server'
import { collection, getDocs, limit, query, startAt, orderBy, where, and } from 'firebase/firestore'
import fireStore from '@/firebase/firestore'
import { json } from 'stream/consumers'
import { entries } from 'remeda'
import { URLSearchParams } from 'url'
interface DataObject {
  [key: string]: any
}

const collectionList = ['products', 'brand', 'newBrand', 'topBrand']
const colorStr = new Map()
colorStr.set('white', '화이트')
colorStr.set('black', '블랙')
colorStr.set('blue', '블루')
colorStr.set('brown', '브라운')
colorStr.set('green', '그린')
colorStr.set('grey', '그레이')
colorStr.set('yellow', '옐로우')
colorStr.set('pink', '핑크')
colorStr.set('pastel', '파스텔')
colorStr.set('pattern', '패턴')

async function fetchData(params: URLSearchParams) {
  let data: DataObject = {}
  console.log('params', params)

  const promises = collectionList.map(async (item) => {
    const queryConstraints = []
    if (item === 'products') {
      const categoryTop = params.get('categoryTop')
      const categorySub = params.get('categorySub')
      if (categoryTop) queryConstraints.push(where('top_category', '==', categoryTop))
      if (categorySub) queryConstraints.push(where('category', '==', categorySub))
    }

    const q = query(collection(fireStore, item), and(...queryConstraints))
    const querySnapshot = await getDocs(q)
    const list = querySnapshot.docs.map((doc) => {
      return { code: doc.id, ...doc.data() }
    })

    if (item === 'cache') {
      const { code, ...newObject } = list[0]
      data[code] = newObject
    } else {
      data[item] = list
    }
  })

  await Promise.all(promises)

  return data
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  try {
    let data = await fetchData(params)

    let numSales = 0
    let numCoupons = 0
    let numExclusive = 0
    let numFreeDelivery = 0

    let numMinMax = 0
    let limitMin = Number.MAX_VALUE
    let limitMax = Number.MIN_VALUE

    let colorMap = new Map()
    colorStr.forEach((value, key) => colorMap.set(key, 0))

    data['products'].forEach((item: any) => {
      if (item['is_sale']) numSales++
      if (item['is_coupon']) numCoupons++
      if (item['is_exclusive']) numExclusive++
      if (item['is_free_delivery']) numFreeDelivery++

      let price = item['final_price']

      if (limitMin > price) {
        // 백원 단위 버림
        limitMin = Math.floor(price / 1000) * 1000
      }
      if (limitMax < price) {
        // 백원 단위 버림
        limitMax = Math.floor(price / 1000) * 1000
      }

      if (limitMin <= price && limitMax >= price) numMinMax++

      let colorCode = item['color']
      if (colorMap.has(colorCode)) {
        let numColors = colorMap.get(colorCode)
        numColors++
        colorMap.set(colorCode, numColors)
      } else {
        colorMap.set(colorCode, 1)
      }
    })

    data['discount'] = [
      {
        code: 'coupon',
        name: '상품 쿠폰',
        count: numCoupons,
      },
      {
        code: 'sale',
        name: '세일중',
        count: numSales,
      },
    ]

    data['benefit'] = [
      {
        code: 'exclusive',
        name: '단독상품',
        count: numExclusive,
      },
      {
        code: 'freeDelivery',
        name: '무료배송',
        count: numFreeDelivery,
      },
    ]

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
    // console.log(newData)
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
