import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IProductListParams } from '@/types/product'
import { fetchProducts } from '@/services/products'
import { paramsToObject, paramsToString } from '@/utils/queryParams'

const PAGE_SIZE = 6

const useQueryProductList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParamsRef = useRef<IProductListParams>({} as IProductListParams)

  useEffect(() => {
    const params = paramsToObject(searchParams)
    queryParamsRef.current = params as unknown as IProductListParams
  }, [])

  const queryKey = ['products']
  const { data, fetchNextPage, hasNextPage, isLoading, refetch } = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => {
      const { page, size, ...restParams } = queryParamsRef.current
      const params = { page: pageParam, size: PAGE_SIZE, ...restParams } as IProductListParams
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

  const updateQueryParams = async (newParams: IProductListParams) => {
    queryParamsRef.current = newParams

    try {
      const { isSuccess } = await refetch()

      // url 변경
      const queryString = paramsToString(newParams)
      const newUrl = `${window.location.pathname}?${queryString}`
      router.replace(newUrl)

      return isSuccess
    } catch (e) {
      console.log(e)
    }
  }

  return { data, fetchNextPage, hasNextPage, isLoading, refetch, updateQueryParams }
}

export default useQueryProductList
