import { useNavigate } from 'react-router';
import { assets } from '../../../assets/assets'
import styles from './Explore.module.css'
import { motion } from 'framer-motion'
const Explore = () => {
  const navigate = useNavigate()
  const handleCategoryClick = () => {
    navigate(`/product/all-products?category=65f3c6cf7fd052885f56d584`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={assets.homeGiftHamper} alt="" />
      </div>
      <motion.div className={styles.contant}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2>More Than a Gift, <br />
          It's a Memory!
        </h2>
        <p>Perfectly Packed for Every Occasion!</p>
        <button onClick={handleCategoryClick} >EXPLORE<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-up-right explore_icon_home_page" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
        </svg></button>
      </motion.div>
    </div>
  )
}

export default Explore
