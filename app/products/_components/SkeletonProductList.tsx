import styles from '@/app/products/_components/ProductList.module.scss'

const SkeletonProductList = () => {
  return (
    <div className={styles.list}>
      {[...Array(4)].map((_, index) => (
        <div key={index} className={styles.skeleton}>
          <div className={(styles.skImg, styles.imgWrap)}></div>
          <div className={styles.info}>
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
