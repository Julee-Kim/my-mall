import { IFilterDiscountBenefit } from '@/types/filter'
import DiscountBenefitContentList from '@/components/products/modalProductFilter/filterContents/DiscountBenefitContentList'

const DiscountBenefitContent = ({ filterData }: { filterData: IFilterDiscountBenefit }) => {
  return (
    <div>
      <DiscountBenefitContentList title="할인" filterList={filterData.discountList} />
      <DiscountBenefitContentList title="혜택" filterList={filterData.benefitList} />
    </div>
  )
}

export default DiscountBenefitContent
