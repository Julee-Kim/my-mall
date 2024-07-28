import { NextRequest, NextResponse } from 'next/server'
import { orderBy, and } from 'firebase/firestore'
import { IFilterData } from './interfaces'
import { createQueryConstraints, getFilteredProducts } from './utils'

export async function POST(request: NextRequest) {
  const data: IFilterData = await request.json()
  const queryConstraints = await createQueryConstraints(data)
  const filteredProducts = await getFilteredProducts([
    orderBy('ordinary'),
    and(...queryConstraints),
  ])

  const res = {
    ok: true,
    total: filteredProducts.length,
  }
  return NextResponse.json(res)
}
