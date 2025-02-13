import { assets } from '../../../assets/assets'
import styles from './Banner.module.css'

const Banner = () => {
  return (
    <div className={styles.conatiner}>
      <div className={styles.innerContainer}>
        <div className={styles.image}>
          <video autoPlay muted loop >
            <source src={assets.cookieVideo} type="video/mp4" />
          </video>
        </div>
        <div className={styles.content}>
          <h2>ABOUT palji bakery</h2>
          <p>Founded in 1983 by Sardar Tarlochan Singh Ji, Palji Bakery began as a humble home bakery driven by a passion for extraordinary treats. Today, his son and grandson carry on this family legacy, crafting vegetarian bakery delights with the same dedication to taste and quality. Decades later, we continue to honor our roots, delivering excellence in every bite.</p>
        </div>
      </div></div>
  )
}

export default Banner
