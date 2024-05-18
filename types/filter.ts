export type TFilterKey = 'color' | 'price' | 'discountBenefit' | 'brand'

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
  code: string
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
  code: string
  name: string
  isActive: boolean
  priceRange: IPriceRange
  selectedRange: IPriceRange
}

interface IFilterDiscountBenefit {
  code: string
  name: string
  isActive: boolean
  discountList: Array<IFilterItem>
  benefitList: Array<IFilterItem>
  selectedList: Array<IFilterItem>
}

interface IFilterBrand {
  code: string
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
