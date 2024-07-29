import Link from 'next/link'
import Image from 'next/image'
import { BsBag } from 'react-icons/bs'
import { comma } from '@/utils'
import { IProduct } from '@/types/product'
import Button from '@/components/_common/button/Button'
import styles from '@/components/products/productList/product/Product.module.scss'

const Product = ({ product }: { product: IProduct }) => {
  return (
    <li>
      <Link href={`/products/${product.ordinary}`}>
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
          {/*<Button icon={<BsBag size={16} />} className={styles.iconCart} />*/}
        </div>
      </Link>
    </li>
  )
}

export default Product
