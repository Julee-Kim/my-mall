import { NextRequest } from 'next/server'
import { collection, getDocs, limit, query, startAt, orderBy } from 'firebase/firestore'
import fireStore from '@/firebase/firestore'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const page = Number(params.get('page'))
  const size = Number(params.get('size'))
  const startIndex = size * (page - 1)

  const docRef = query(
    collection(fireStore, 'products'),
    orderBy('ordinary'),
    startAt(startIndex),
    limit(size),
  )
  const docSnap = await getDocs(docRef)
  const list = docSnap.docs.map((doc) => doc.data())

  const res = {
    ok: true,
    page,
    size,
    total: 19,
    list,
  }
  return Response.json(res)
}
