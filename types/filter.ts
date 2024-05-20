import { ReactNode } from 'react'

export const TFilterKeyTypes = ['color', 'price', 'discountBenefit', 'brand'] as const
export type TFilterKey = (typeof TFilterKeyTypes)[number]

export interface ITest {
  id: TFilterKey
  name: string
}

interface IFilterItem {
  code: string
  name: string
  count: number
}

interface IFilterBrandItem {
  code: number
  name: string
  eng_name: string
  count: number
  tags: Array<string>
}

interface IFilterColor {
  code: TFilterKey[0]
  name: string
  isActive: boolean
  list: Array<IFilterItem>
  selectedList: Array<IFilterItem>
}

export interface IPriceRange {
  min: number
  max: number
}

interface IFilterPrice {
  code: TFilterKey[1]
  name: string
  isActive: boolean
  priceRange: IPriceRange
  selectedRange: IPriceRange
}

interface IFilterDiscountBenefit {
  code: TFilterKey[2]
  name: string
  isActive: boolean
  discountList: Array<IFilterItem>
  benefitList: Array<IFilterItem>
  selectedList: Array<IFilterItem>
}

interface IFilterBrand {
  code: TFilterKey[3]
  name: string
  isActive: boolean
  all: Array<IFilterBrandItem>
  top: Array<IFilterBrandItem>
  new: Array<IFilterBrandItem>
  selectedList: Array<IFilterBrandItem>
}

export interface IFilters {
  color: IFilterColor
  price: IFilterPrice
  discountBenefit: IFilterDiscountBenefit
  brand: IFilterBrand
}

export type IFilterValue = IFilterColor | IFilterPrice | IFilterDiscountBenefit | IFilterBrand

export type TModalProductFilterContentView = {
  [key in TFilterKey]: ReactNode
}

export interface IModalProductFilterProps {
  isOpen: boolean
  onOk: () => void
  onCancel: () => void
  filterData: IFilters
  tab: TFilterKey
}
