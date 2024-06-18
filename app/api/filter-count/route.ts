import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log(request.body)

  const res = {
    ok: true,
    total: 120,
  }
  return NextResponse.json(res)
}
