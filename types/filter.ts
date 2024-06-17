import { FILTER_CODE } from '@/constants/filter'

export type TFilterKey =
  | FILTER_CODE.color
  | FILTER_CODE.price
  | FILTER_CODE.discountBenefit
  | FILTER_CODE.brand

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
  list: ISelectedFilterItem[]
}

export interface IFilterBar {
  color: IFilterBarValue
  price: IFilterBarValue
  discountBenefit: IFilterBarValue
  brand: IFilterBarValue
}

export interface IFiltersRes {
  [FILTER_CODE.color]: IFilterItem[]
  [FILTER_CODE.price]: IFilterPrice
  [FILTER_CODE.discount]: IFilterItem[]
  [FILTER_CODE.benefit]: IFilterItem[]
  [FILTER_CODE.brand]: IFilterBrandItem[]
  [FILTER_CODE.topBrand]: IFilterBrandItem[]
  [FILTER_CODE.newBrand]: IFilterBrandItem[]
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

export interface IFilterDataItem extends IFilterItem {
  isActive: boolean
}

export interface IFilterDataBrandItem extends IFilterBrandItem {
  isActive: boolean
}

export interface IFilterData {
  [FILTER_CODE.color]: IFilterDataItem[]
  [FILTER_CODE.price]: IFilterPrice
  [FILTER_CODE.discount]: IFilterDataItem[]
  [FILTER_CODE.benefit]: IFilterDataItem[]
  [FILTER_CODE.brand]: IFilterDataBrandItem[]
  [FILTER_CODE.topBrand]: IFilterDataBrandItem[]
  [FILTER_CODE.newBrand]: IFilterDataBrandItem[]
}

export type TSelectedFilterKey =
  | FILTER_CODE.color
  | FILTER_CODE.price
  | FILTER_CODE.discount
  | FILTER_CODE.benefit
  | FILTER_CODE.brand
  | FILTER_CODE.topBrand
  | FILTER_CODE.newBrand

export type TFilterItemCode = string | number

export interface ISelectedFilterItem {
  type: TSelectedFilterKey
  code: TFilterItemCode
  name: string
}

export type TSelectedFilterItemKey =
  | FILTER_CODE.color
  | FILTER_CODE.discount
  | FILTER_CODE.benefit
  | FILTER_CODE.brand
  | FILTER_CODE.topBrand
  | FILTER_CODE.newBrand

export type TArgFilterDataItem = IFilterDataItem | IFilterDataBrandItem

interface IFilterContentProps {
  onAdd: (type: TSelectedFilterItemKey, item: TArgFilterDataItem) => void
  onDelete: (type: TSelectedFilterItemKey, code: TFilterItemCode) => void
}

export interface IColorContentProps extends IFilterContentProps {
  filterData: IFilterDataItem[]
}

export interface ISelectedFilterListProps {
  list: ISelectedFilterItem[]
  onDelete: (item: ISelectedFilterItem) => void
}

export interface IFilterBarListItem {
  code: TFilterKey
  name: string
  isActive: boolean
}

type TTabId<T> = T extends infer R ? R : string

export interface ITab<T> {
  id: TTabId<T>
  name: string
  isActive?: boolean
}
