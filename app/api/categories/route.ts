import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const data = [
    {
      id: 'clothes',
      name: '의류',
      category: [
        {
          id: 'jacket',
          name: '아우터',
        },
        {
          id: 'dress',
          name: '원피스',
        },
        {
          id: 'shirt',
          name: '셔츠',
        },
      ],
    },
    {
      id: 'bag',
      name: '가방',
      category: [
        {
          id: 'shoulderbag',
          name: '숄더백',
        },
        {
          id: 'totebag',
          name: '토트백',
        },
        {
          id: 'backpack',
          name: '백팩',
        },
      ],
    },
  ]

  const res = {
    ok: true,
    data,
  }
  return Response.json(res)
}
