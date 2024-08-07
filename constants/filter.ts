import {
  IBrandTab,
  IFilterBar,
  IFilterBrand,
  IFilterData,
  IFilterPriceItem,
  TFilterBarTypeToMapping,
  TFilterKey,
  TSelectedFilterKey,
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

export const initialFilterBar: IFilterBar = {
  color: {
    name: FILTER_NAME.color,
    isActive: false,
  },
  price: {
    name: FILTER_NAME.price,
    isActive: false,
  },
  discountBenefit: {
    name: FILTER_NAME.discountBenefit,
    isActive: false,
  },
  brand: {
    name: FILTER_NAME.brand,
    isActive: false,
  },
}

export const initialFilterPrice: IFilterPriceItem = {
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
  [FILTER_CODE.color]: [],
  [FILTER_CODE.price]: { ...initialFilterPrice },
  [FILTER_CODE.discount]: [],
  [FILTER_CODE.benefit]: [],
  [FILTER_CODE.brand]: [],
  [FILTER_CODE.topBrand]: [],
  [FILTER_CODE.newBrand]: [],
}

export const tabTypesToCheck = {
  [FILTER_CODE.color]: [FILTER_CODE.color],
  [FILTER_CODE.price]: [FILTER_CODE.price],
  [FILTER_CODE.discountBenefit]: [FILTER_CODE.discount, FILTER_CODE.benefit],
  [FILTER_CODE.brand]: [FILTER_CODE.brand, FILTER_CODE.topBrand, FILTER_CODE.newBrand],
}

export const filterBarTypeToMapping: Record<TSelectedFilterKey, TFilterKey> = {
  [FILTER_CODE.color]: FILTER_CODE.color,
  [FILTER_CODE.price]: FILTER_CODE.price,
  [FILTER_CODE.discount]: FILTER_CODE.discountBenefit,
  [FILTER_CODE.benefit]: FILTER_CODE.discountBenefit,
  [FILTER_CODE.brand]: FILTER_CODE.brand,
  [FILTER_CODE.topBrand]: FILTER_CODE.brand,
  [FILTER_CODE.newBrand]: FILTER_CODE.brand,
} as const

export const initialFilterTempForOrder: TFilterBarTypeToMapping = {
  [FILTER_CODE.color]: [],
  [FILTER_CODE.price]: [],
  [FILTER_CODE.discountBenefit]: [],
  [FILTER_CODE.brand]: [],
}

export const FILTER_KEYS: TSelectedFilterKey[] = [
  FILTER_CODE.color,
  FILTER_CODE.price,
  FILTER_CODE.discount,
  FILTER_CODE.benefit,
  FILTER_CODE.brand,
  FILTER_CODE.topBrand,
  FILTER_CODE.newBrand,
] as const
