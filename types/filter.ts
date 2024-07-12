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
  limitMin: number
  limitMax: number
  count: number
}

export interface IFilterBrandItem {
  code: number
  name: string
  eng_name: string
  count: number
  tags: string[]
}

export interface IFilterBrand {
  all: IFilterDataBrandItem[]
  top: IFilterDataBrandItem[]
  new: IFilterDataBrandItem[]
}

export interface IFilterBarValue {
  name: string
  isActive: boolean
}

export type IFilterBar = Record<TFilterKey, IFilterBarValue>

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
  onOk: (selectedFilterList: ISelectedFilterItem[], limitPrice: ILimitPrice) => void
  onCancel: () => void
  tab: TFilterKey
  selectedFilters: ISelectedFilterItem[]
}

export interface IDiscountBenefitContentProps extends IFilterContentProps {
  discount: IFilterDataItem[]
  benefit: IFilterDataItem[]
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

export interface IFetchFilterCountRes {
  ok: boolean
  total: number
}

export interface IFilterDataItem extends IFilterItem {
  type: TSelectedFilterItemKey
  isActive: boolean
}

export interface IFilterDataBrandItem extends IFilterBrandItem {
  type: TSelectedFilterItemKey
  isActive: boolean
}

export interface IFilterPriceItem extends IFilterPrice {
  min: number
  max: number
}

export interface IFilterData {
  [FILTER_CODE.color]: IFilterDataItem[]
  [FILTER_CODE.price]: IFilterPriceItem
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

export interface IDiscountBenefitContentListProps extends IFilterContentProps {
  title: string
  filterData: IFilterDataItem[]
}

export interface IBrandContentProps extends IFilterContentProps {
  filterData: IFilterBrand
}

export interface ISelectedFilterListProps {
  list: ISelectedFilterItem[]
  onDelete: (item: ISelectedFilterItem) => void
  onReset: () => void
}

export interface IFilterBarListItem {
  code: TFilterKey
  name: string
  isActive: boolean
}

export type TFilterBarTypeToMapping = Record<TFilterKey, ISelectedFilterItem[]>

export type TAddPropertiesToListItem<T> = (T & {
  isActive: boolean
  type: TSelectedFilterItemKey
})[]

export interface ILimitPrice {
  limitMin: number
  limitMax: number
}
