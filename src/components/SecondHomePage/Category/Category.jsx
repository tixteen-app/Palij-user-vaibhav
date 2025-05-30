import { useNavigate } from 'react-router'
import { assets } from '../../../assets/assets'
import styles from './Category.module.css'
import { motion } from 'framer-motion'

const categories = [
  {
    img: assets.category1,
    name: "Cookies",
    color: "#64C4B1",
    nav: "65fc0c45d3cadabee3443e54"
  },
  {
    img: assets.category2,
    name: "Savouries",
    color: "#D73A38",
    nav: "65f3c6ee7fd052885f56d587"
  },
  {
    img: assets.category3,
    name: "Gift Hampers",
    color: "#64C4B1",
    nav: "65f3c6cf7fd052885f56d584"
  },
  {
    img: assets.category4,
    name: "Cakes",
    color: "#D73A38",
    nav: "67b451f7ec3a4e4a3bbe5633"
  },
]


const Category = () => {
  const navigate = useNavigate()


  const handleCategoryClick = (category) => {
    navigate(`/product/all-products?category=${category}`);
  };


  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className={styles.header}>
        <h2 className={styles.title_text} >SHOP BY CATEGORY</h2>
        <h2 className={styles.title_text} style={{ cursor: "pointer" }} onClick={() => navigate("/product/all-products")}>
          VIEW ALL <img src={assets.brownArrow} alt="" />
        </h2>
      </motion.div>
      <div className={styles.cards}>{
        categories.map(item => (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}

            key={item.name}
            className={styles.cardContainer} onClick={() => handleCategoryClick(item.nav)} style={{ cursor: "pointer" }}>
            <div className={styles.innerContent} style={{ background: item.color }}>
              <motion.img
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={styles.categoryImg} src={item.img} alt={item.name} />
            </div>
            <div className={styles.name}>
              <p>{item.name}</p>
              <img src={assets.blackArrow} alt="" />
            </div>
          </motion.div>
        ))
      }</div>
    </div>
  )
}

export default Category
