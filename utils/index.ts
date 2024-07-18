/**
 * 금액 천단위 콤마
 * @params price 금액
 * */
export const comma = (price: number) => {
  return price.toLocaleString('ko-KR')
}
