import listStyles from '@/components/products/ProductList/ProductList.module.scss'
import productStyles from '@/components/products/Product/Product.module.scss'
import styles from '@/components/products/SkeletonProductList/SkeletonProductList.module.scss'

const SkeletonProductList = () => {
  return (
    <div className={listStyles.list}>
      {[...Array(4)].map((_, index) => (
        <div key={index} className={styles.skeleton}>
          <div className={(styles.skImg, productStyles.imgWrap)}></div>
          <div className={productStyles.info}>
            <p className={styles.skBrand}></p>
            <div>
              <p className={styles.skName}></p>
              <p className={styles.skName}></p>
            </div>
            <p className={styles.skPrice}></p>
            <div>
              <span className={styles.skBadge}></span>
              <span className={styles.skBadge}></span>
            </div>
            <p className={styles.skIconCart}></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonProductList
