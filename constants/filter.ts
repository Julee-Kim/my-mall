import { IBrandTab, IFilters } from '@/types/filter'

export const initialFilterColor = {
  code: 'color',
  name: '컬러',
  isActive: false,
  list: [],
  selectedList: [],
}
export const initialFilterPrice = {
  code: 'price',
  name: '가격',
  isActive: false,
  priceRange: {
    min: 0,
    max: 0,
  },
  selectedRange: {
    min: 0,
    max: 0,
  },
}
export const initialFilterDiscountBenefit = {
  code: 'discountBenefit',
  name: '할인/혜택',
  isActive: false,
  discountList: [],
  benefitList: [],
  selectedList: [],
}
export const initialFilterBrand = {
  code: 'brand',
  name: '브랜드',
  isActive: false,
  all: [],
  top: [],
  new: [],
  selectedList: [],
}

export const initialFilters = {
  color: initialFilterColor,
  price: initialFilterPrice,
  discountBenefit: initialFilterDiscountBenefit,
  brand: initialFilterBrand,
}

export const filters: IFilters = {
  color: {
    code: 'color',
    name: '컬러',
    isActive: false,
    list: [
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
    selectedList: [],
  },
  price: {
    code: 'price',
    name: '가격',
    isActive: false,
    priceRange: {
      min: 10000,
      max: 150000,
    },
    selectedRange: {
      min: 0,
      max: 0,
    },
  },
  discountBenefit: {
    code: 'discountBenefit',
    name: '할인/혜택',
    isActive: false,
    discountList: [
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
    benefitList: [
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
    selectedList: [],
  },
  brand: {
    code: 'brand',
    name: '브랜드',
    isActive: false,
    all: [
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
    top: [
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
    new: [
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
    selectedList: [],
  },
}

export const tabList: IBrandTab[] = [
  { type: 'all', label: '전체' },
  { type: 'top', label: '인기' },
  { type: 'new', label: '신규' },
]
