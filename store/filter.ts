import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IFilterBar, ISelectedFilter } from '@/types/filter'
import { initialFilterBar } from '@/constants/filter'

interface FilterState {
  filterBar: IFilterBar
  isActiveColorTab: boolean
  isActivePriceTab: boolean
  isActiveDiscountBenefitTab: boolean
  isActiveBrandTab: boolean
  selectedFilters: ISelectedFilter[]

  setFilterBar: (filterBar: IFilterBar) => void
  setIsActiveColorTab: (isActiveColorTab: boolean) => void
  setIsActivePriceTab: (isActivePriceTab: boolean) => void
  setIsActiveDiscountBenefitTab: (isActiveDiscountBenefitTab: boolean) => void
  setIsActiveBrandTab: (isActiveBrandTab: boolean) => void
  setSelectedFilters: (list: ISelectedFilter[]) => void
}

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      filterBar: { ...initialFilterBar },
      isActiveColorTab: false,
      isActivePriceTab: false,
      isActiveDiscountBenefitTab: false,
      isActiveBrandTab: false,
      selectedFilters: [],

      setFilterBar: (filterBar: IFilterBar) => set({ filterBar }),
      setIsActiveColorTab: (isActiveColorTab: boolean) => set({ isActiveColorTab }),
      setIsActivePriceTab: (isActivePriceTab: boolean) => set({ isActivePriceTab }),
      setIsActiveDiscountBenefitTab: (isActiveDiscountBenefitTab: boolean) =>
        set({ isActiveDiscountBenefitTab }),
      setIsActiveBrandTab: (isActiveBrandTab: boolean) => set({ isActiveBrandTab }),
      setSelectedFilters: (selectedFilters: ISelectedFilter[]) => set({ selectedFilters }),
    }),
    { name: 'useFilterStore' },
  ),
)
