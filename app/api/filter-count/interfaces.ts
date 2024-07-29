export interface IPriceRange {
  min: number
  max: number
}

export interface IFilterData {
  price?: IPriceRange
  color?: string
  discount?: string[]
  benefit?: string[]
  brand?: string[]
  categoryTop?: string
  categorySub?: string
}
