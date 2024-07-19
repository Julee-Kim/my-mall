/**
 * 금액 천단위 콤마
 * @params price 금액
 * */
export const comma = (price: number) => {
  return price.toLocaleString('ko-KR')
}

const chunkAtEnd = (value = ''): string[] => {
  const result = []
  const chunkSize = 4 // 쪼갤 크기를 4로 고정

  // 문자열을 끝에서부터 4자리씩 쪼갬
  for (let end = value.length; end > 0; end -= chunkSize) {
    // 현재 끝에서 4자리를 잘라서 배열에 추가
    const chunk = value.substring(Math.max(0, end - chunkSize), end)
    result.push(chunk)
  }

  return result
}

/**
 * 금액 숫자+한글 조합으로 변환
 * @params price 금액
 * ex)
 * 2000 -> 2천원
 * 10400 -> 1만원
 * 10500 -> 1만1천원
 * 12000 -> 1만2천원
 * 123000 -> 12만3천원
 * 1234000 -> 123만4천원
 * */
export const formatToKorean = (amount: number) => {
  const thousandUnits = ['천', '만']

  // 500원 단위 반올림
  let roundedAmount = Math.round(amount / 1000) * 1000

  const result = chunkAtEnd(String(roundedAmount)).reduce((acc, cur, index) => {
    let amount = Number(cur)

    if (!amount) return acc

    // 천원단위
    if (index === 0 && amount) {
      amount = Math.floor(amount / 1000)
    }

    const unit = thousandUnits[index] ?? ''

    return `${amount}${unit}${acc}`
  }, '')

  return result + '원'
}
