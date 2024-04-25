'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { comma } from '@/utils'
import { IProduct } from '@/types/product'
import Button from '@/components/_common/button/Button'
import styles from '@/app/products/_components/ProductList.module.scss'
import IconCartImg from '@/public/images/icon/icon-cart.svg'

export default function Product({ product, page }: { product: IProduct; page: number }) {
  const router = useRouter()

  const goDetail = (id: number) => {
    // 이동 전 스크롤 위치와 페이지 세션스토리지에 저장
    sessionStorage.setItem(
      '__next_scroll_list',
      JSON.stringify({
        page: page,
        x: window.scrollX,
        y: window.scrollY,
      }),
    )

    router.push(`/products/${id}`)
  }

  return (
    <li onClick={() => goDetail(product.ordinary)}>
      <div className={styles.imgWrap}>
        <Image
          src={product.img}
          alt={product.name}
          width={100}
          height={100}
          className={styles.img}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.nameBrand}>
          <p className={styles.brand}>{product.brand}</p>
          <h4 className={styles.name}>{product.name}</h4>
        </div>
        <div className={styles.price}>
          {product.customer_price && (
            <span className={styles.priceCustomer}>{comma(product.customer_price)}</span>
          )}
          <p className={styles.discountPrice}>
            {product.discount && <span className={styles.discount}>{product.discount}%</span>}
            <strong>{comma(product.final_price)}</strong>
          </p>
        </div>
        <div className={styles.badge}>
          {product.is_coupon && <span className={styles.coupon}>쿠폰</span>}
          {product.is_exclusive && <span className={styles.exclusive}>단독</span>}
        </div>
        <Button icon={<IconCart />} className={styles.iconCart} />
      </div>
    </li>
  )
}

const IconCart = () => <Image src={IconCartImg} alt={'장바구니'} width={22} height={22} />
