import { IDiscountBenefitContentProps } from '@/types/filter'
import DiscountBenefitContentList from '@/components/products/filter/modalFilter/filterContents/DiscountBenefitContentList'

const DiscountBenefitContent = ({
  discount,
  benefit,
  onAdd,
  onDelete,
}: IDiscountBenefitContentProps) => {
  return (
    <div>
      <DiscountBenefitContentList
        title="할인"
        filterData={discount}
        onAdd={onAdd}
        onDelete={onDelete}
      />
      <DiscountBenefitContentList
        title="혜택"
        filterData={benefit}
        onAdd={onAdd}
        onDelete={onDelete}
      />
    </div>
  )
}

export default DiscountBenefitContent
