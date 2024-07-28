export interface IBrand {
  code: number
  name: string
  eng_name: string
  count: number
  tags: string[]
}

export interface ICounterItem {
  is_sale?: boolean
  is_coupon?: boolean
  is_exclusive?: boolean
  is_free_delivery?: boolean
}

export interface ICounters {
  numSales: number
  numCoupons: number
  numExclusive: number
  numFreeDelivery: number
}

export interface IDataObject {
  [key: string]: any
}
