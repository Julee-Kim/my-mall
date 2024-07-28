import fireStore from '@/firebase/firestore'
import { collection, getDocs, query, where, and } from 'firebase/firestore'
import { collectionList } from './constants'
import { IDataObject } from './interfaces'

export async function fetchData(params: URLSearchParams) {
  let data: IDataObject = {}

  // 각 컬렉션 데이터를 비동기로 요청
  const promises = collectionList.map(async (item) => {
    // products 컬렉션은 카테고리에 해당하는 아이템만 요청
    const queryConstraints = []
    if (item === 'products') {
      const categoryTop = params.get('categoryTop')
      const categorySub = params.get('categorySub')
      if (categoryTop) queryConstraints.push(where('top_category', '==', categoryTop))
      if (categorySub) queryConstraints.push(where('category', '==', categorySub))
    }

    const q = query(collection(fireStore, item), and(...queryConstraints))

    const querySnapshot = await getDocs(q)
    const list = querySnapshot.docs.map((doc) => ({ code: doc.id, ...doc.data() }))

    data[item] = list
  })

  await Promise.all(promises)

  return data
}
