import { useNavigate } from 'react-router';
import { assets } from '../../../assets/assets'
import styles from './Explore.module.css'
import {motion} from 'framer-motion'
const Explore = () => {
  const navigate = useNavigate()
  const handleCategoryClick = () => {
    navigate(`/product/all-products?category=65f3c6cf7fd052885f56d584`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <motion.img
        initial={{ opacity: 0 , scale: 0.8}}
        whileInView={{ opacity: 1 , scale: 1}}
        transition={{ duration: 0.6 }}
        src={assets.homeGiftHamper} alt="" />
      </div>
      <motion.div className={styles.contant}
        initial={{ opacity: 0 , y: 100}}
        whileInView={{ opacity: 1 , y: 0}}
        transition={{ duration: 0.9 }}
      >
        <h2>More Than a Gift, <br />
          It's a Memory!
        </h2>
        <p>Perfectly Packed for Every Occasion!</p>
        <button onClick={handleCategoryClick} >EXPLORE <img src={assets.crossArrow} alt="" /></button>
      </motion.div>
    </div>
  )
}

export default Explore
