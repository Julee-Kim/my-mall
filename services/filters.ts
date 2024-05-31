import { IFetchFiltersRes } from '@/types/filter'

export const fetchFilters = async (): Promise<IFetchFiltersRes> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/filters`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
