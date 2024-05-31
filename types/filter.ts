import { FILTER_CODE } from '@/constants/filter'

export const TFilterKeyTypes = [
  FILTER_CODE.color,
  FILTER_CODE.price,
  FILTER_CODE.discountBenefit,
  FILTER_CODE.brand,
] as const
export type TFilterKey = (typeof TFilterKeyTypes)[number]

export interface IFilterItem {
  code: string
  name: string
  count: number
}

export interface IFilterPrice {
  min: number
  max: number
  limitMin: number
  limitMax: number
}

export interface IFilterBrandItem {
  code: number
  name: string
  eng_name: string
  count: number
  tags: string[]
}

export interface IFilterBrand {
  all: IFilterBrandItem[]
  top: IFilterBrandItem[]
  new: IFilterBrandItem[]
}

export interface IFilterBarValue {
  name: string
  list: ISelectedFilter[]
}

export interface IFilterBar {
  color: IFilterBarValue
  price: IFilterBarValue
  discountBenefit: IFilterBarValue
  brand: IFilterBarValue
}

export interface IFiltersRes {
  color: IFilterItem[]
  price: IFilterPrice
  discount: IFilterItem[]
  benefit: IFilterItem[]
  brand: IFilterBrandItem[]
  topBrand: IFilterBrandItem[]
  newBrand: IFilterBrandItem[]
}

export interface IModalProductFilterProps {
  isOpen: boolean
  onOk: () => void
  onCancel: () => void
  // filterData: IFiltersRes
  tab: TFilterKey
}

export interface IDiscountBenefitContentProps {
  discount: IFilterItem[]
  benefit: IFilterItem[]
}

export type TBrandTabs = 'all' | 'top' | 'new'

export interface IBrandTab {
  type: TBrandTabs
  label: string
}

export interface IFetchFiltersRes {
  ok: boolean
  total: number
  data: IFiltersRes
}

export const TSelectedFilterTypes = [
  FILTER_CODE.color,
  FILTER_CODE.price,
  FILTER_CODE.discount,
  FILTER_CODE.benefit,
  FILTER_CODE.brand,
  FILTER_CODE.topBrand,
  FILTER_CODE.newBrand,
] as const
export type TSelectedFilterKey = (typeof TSelectedFilterTypes)[number]

export interface ISelectedFilter {
  type: TSelectedFilterKey
  code: string | number
  name: string
}
