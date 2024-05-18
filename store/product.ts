import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IProduct } from '@/types/product'

interface ProductState {
  products: IProduct[]

  setProducts: (products: any) => void
}

export const useProductStore = create<ProductState>()(
  devtools(
    (set) => ({
      products: [],

      setProducts: (products: IProduct[]) => set({ products }),
    }),
    { name: 'useProductStore' },
  ),
)
