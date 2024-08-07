import { IFetchFiltersRes, IFetchFilterCountRes } from '@/types/filter'
import { paramsToString } from '@/utils/queryParams'

// TODO: params 타입 정의
export const fetchFilters = async (params: any): Promise<IFetchFiltersRes> => {
  const queryString = paramsToString({ ...params })
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/filters?${queryString}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// TODO: payload 타입 정의
export const fetchFilterCount = async (payload: any): Promise<IFetchFilterCountRes> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/filter-count`

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'content-type': 'application/json' },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
