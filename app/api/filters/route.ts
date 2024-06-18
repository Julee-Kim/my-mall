import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const data = {
    color: [
      {
        code: 'white',
        name: '화이트',
        count: 2348,
      },
      {
        code: 'grey',
        name: '그레이',
        count: 384,
      },
      {
        code: 'black',
        name: '블랙',
        count: 874,
      },
      {
        code: 'yellow',
        name: '옐로우',
        count: 1234,
      },
      {
        code: 'pink',
        name: '핑크',
        count: 10,
      },
      {
        code: 'green',
        name: '그린',
        count: 765,
      },
      {
        code: 'blue',
        name: '블루',
        count: 234,
      },
      {
        code: 'brown',
        name: '브라운',
        count: 567,
      },
      {
        code: 'pastel',
        name: '파스텔',
        count: 222,
      },
      {
        code: 'pattern',
        name: '패턴',
        count: 456,
      },
    ],
    price: {
      min: 10000,
      max: 1500000,
      limitMin: 10000,
      limitMax: 1500000,
      count: 8,
    },
    discount: [
      {
        code: 'sale',
        name: '세일중',
        count: 8125,
      },
      {
        code: 'coupon',
        name: '상품 쿠폰',
        count: 6214,
      },
    ],
    benefit: [
      {
        code: 'freeDelivery',
        name: '무료배송',
        count: 16415,
      },
      {
        code: 'exclusive',
        name: '단독상품',
        count: 1075,
      },
    ],
    brand: [
      {
        code: 105001,
        name: '320쇼룸',
        eng_name: '320SHOWROOM',
        count: 29,
        tags: [],
      },
      {
        code: 100474,
        name: '삼팔컴온커먼',
        eng_name: '38comeoncommon',
        count: 1,
        tags: [],
      },
      {
        code: 106188,
        name: '어오트',
        eng_name: 'A HAUTE',
        count: 1,
        tags: [],
      },
    ],
    topBrand: [
      {
        code: 106463,
        name: '아무르 무아르',
        eng_name: 'Amour moier',
        count: 86,
        tags: ['단독'],
      },
      {
        code: 108666,
        name: '이바나헬싱키',
        eng_name: 'IvanaHelsinki',
        count: 83,
        tags: ['단독'],
      },
    ],
    newBrand: [
      {
        code: 113480,
        name: '제이제이지고트',
        eng_name: 'JJ JIGOTT',
        count: 39,
        tags: [],
      },
      {
        code: 113432,
        name: '러브엠',
        eng_name: 'LUV.M by MOJO.S.PHINE',
        count: 9,
        tags: [],
      },
    ],
  }

  const res = {
    ok: true,
    data,
    total: 1234,
  }
  return Response.json(res)
}
