import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs, limit, query, startAt, orderBy } from 'firebase/firestore'
import fireStore from '@/firebase/firestore'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const page = Number(params.get('page')) - 1
  const size = Number(params.get('size'))
  const startIndex = size * page

  const docRef = query(
    collection(fireStore, 'products'),
    orderBy('ordinary'),
    startAt(startIndex),
    limit(size),
  )
  const docSnap = await getDocs(docRef)
  const data = docSnap.docs.map((doc) => doc.data())
  return NextResponse.json(data)
}
