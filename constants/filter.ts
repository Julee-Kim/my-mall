import {
  IBrandTab,
  IFilterBar,
  IFilterBarListItem,
  IFilterBrand,
  IFilterData,
  IFilterPrice,
} from '@/types/filter'

export enum FILTER_NAME {
  color = '컬러',
  price = '가격',
  discountBenefit = '할인/혜택',
  brand = '브랜드',
}

export enum FILTER_CODE {
  color = 'color',
  price = 'price',
  discount = 'discount',
  benefit = 'benefit',
  discountBenefit = 'discountBenefit',
  brand = 'brand',
  topBrand = 'topBrand',
  newBrand = 'newBrand',
}

export const BRAND_TAB_LIST: IBrandTab[] = [
  { type: 'all', label: '전체' },
  { type: 'top', label: '인기' },
  { type: 'new', label: '신규' },
] as const

export const FILTER_BAR_LIST: IFilterBarListItem[] = [
  { code: FILTER_CODE.color, name: FILTER_NAME.color, isActive: false },
  { code: FILTER_CODE.price, name: FILTER_NAME.price, isActive: false },
  { code: FILTER_CODE.discountBenefit, name: FILTER_NAME.discountBenefit, isActive: false },
  { code: FILTER_CODE.brand, name: FILTER_NAME.brand, isActive: false },
] as const

export const initialFilterBar: IFilterBar = {
  color: {
    name: FILTER_NAME.color,
    list: [],
  },
  price: {
    name: FILTER_NAME.price,
    list: [],
  },
  discountBenefit: {
    name: FILTER_NAME.discountBenefit,
    list: [],
  },
  brand: {
    name: FILTER_NAME.brand,
    list: [],
  },
}

export const initialFilterPrice: IFilterPrice = {
  min: 0,
  max: 0,
  limitMin: 0,
  limitMax: 0,
  count: 0,
}

export const initialFilterBrand: IFilterBrand = {
  all: [],
  top: [],
  new: [],
}

export const initialFilterData: IFilterData = {
  color: [],
  price: { ...initialFilterPrice },
  discount: [],
  benefit: [],
  brand: [],
  topBrand: [],
  newBrand: [],
}
