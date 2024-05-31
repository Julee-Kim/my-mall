import { IDiscountBenefitContentProps } from '@/types/filter'
import DiscountBenefitContentList from '@/components/products/filter/modalFilter/filterContents/DiscountBenefitContentList'

const DiscountBenefitContent = ({ discount, benefit }: IDiscountBenefitContentProps) => {
  return (
    <div>
      <DiscountBenefitContentList title="할인" filterList={discount} />
      <DiscountBenefitContentList title="혜택" filterList={benefit} />
    </div>
  )
}

export default DiscountBenefitContent
