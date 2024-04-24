import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/_common/button/Button'
import { comma } from '@/utils'
import styles from './ProductList.module.scss'
import IconCartImg from '@/public/images/icon/icon-cart.svg'

export default function ProductList({ data }: { data: any }) {
  return (
    <ul className={styles.list}>
      {data.map((product: any) => (
        <li key={product.id}>
          <Link href={''} className={styles.imgWrap}>
            <Image
              src={product.img}
              alt={product.name}
              width={100}
              height={100}
              className={styles.img}
            />
          </Link>
          <Link href={''} className={styles.info}>
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
          </Link>
        </li>
      ))}
    </ul>
  )
}

const IconCart = () => <Image src={IconCartImg} alt={'장바구니'} width={22} height={22} />