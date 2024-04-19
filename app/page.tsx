import Image from 'next/image'

async function getData(params: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${params.page}&size=${params.size}`
  const res = await fetch(url, params)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData({ page: 2, size: 2 })

  return (
    <main>
      {data.map((item: any) => (
        <div key={item.name}>
          <p>name: {item.name}</p>
          {item.img && <Image src={item.img} alt={item.name} width={200} height={200} />}
        </div>
      ))}
    </main>
  )
}
