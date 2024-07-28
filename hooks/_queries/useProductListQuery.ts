import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IProductListParams } from '@/types/product'
import { fetchProducts } from '@/services/products'
import { paramsToObject } from '@/utils/queryParams'

const PAGE_SIZE = 6

const useProductListQuery = () => {
  const searchParams = useSearchParams()

  const queryKey = ['products', paramsToObject(searchParams)]
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5분
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => {
      const searchParamsObj = paramsToObject(searchParams)
      const params = {
        page: pageParam,
        size: PAGE_SIZE,
        ...searchParamsObj,
      } as IProductListParams
      return fetchProducts(params)
    },
    select: (data) => {
      return {
        pageParams: data.pageParams,
        pages: data.pages,
        currentPage: data.pageParams.length,
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        const { page, size, total } = lastPage
        return page * size < total ? page + 1 : undefined
      }
    },
  })

  return { data, fetchNextPage, hasNextPage, isLoading }
}

export default useProductListQuery
