import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { IFetchFiltersRes } from '@/types/filter'
import { fetchFilters } from '@/services/filters'
import { paramsToObject } from '@/utils/queryParams'

export const useFiltersQuery = () => {
  const searchParams = useSearchParams()
  let searchParamsObj = paramsToObject(searchParams)

  const queryKey = ['filters', searchParamsObj]
  const { data: filters } = useQuery({
    queryKey,
    staleTime: 1000 * 60 * 5, // 5분
    queryFn: (): Promise<IFetchFiltersRes> => {
      // 현재 카테고리 추출
      const categoryTop = searchParams.get('categoryTop') || ''
      const categorySub = searchParams.get('categorySub') || ''

      const params = { categoryTop, categorySub }
      return fetchFilters(params)
    },
  })

  return { filters }
}

export default useFiltersQuery
