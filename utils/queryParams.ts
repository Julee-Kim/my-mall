export const paramsToObject = (searchParams: URLSearchParams): Record<string, string> => {
  const entries = Array.from(searchParams.entries())
  return entries.reduce(
    (acc, [key, value]) => {
      acc[key] = String(value)
      return acc
    },
    {} as Record<string, string>,
  )
}

export const paramsToString = (params: Record<string, any>): string => {
  const queryParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value)
      return acc
    },
    {} as Record<string, string>,
  )
  return new URLSearchParams(queryParams).toString()
}
