// import { useNavigate } from 'react-router'
// import { assets } from '../../../assets/assets'
// import styles from './Category.module.css'

// const categories = [
//   {
//     img: assets.category1,
//     name: "Cookies",
//     color: "#BA7830",
//     nav: "65fc0c45d3cadabee3443e54"
//   },
//   {
//     img: assets.category2,
//     name: "Savouries",
//     color: "#9F65E8",
//     nav: "65f3c6ee7fd052885f56d587"
//   },
//   {
//     img: assets.category3,
//     name: "Gift Hampers",
//     color: "#FFAE55",
//     nav: "65f3c6cf7fd052885f56d584"
//   },
//   {
//     img: assets.category4,
//     name: "Cakes",
//     color: "#E75866",
//     nav: "67b451f7ec3a4e4a3bbe5633"
//   },
// ]


// const Category = () => {
//   const navigate = useNavigate()
 

//   const handleCategoryClick = (category) => {
//     navigate(`/product/all-products?category=${category}`);
//   };


//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>SHOP BY CATEGORY</h2>
//         <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/product/all-products")}>
//           VIEW ALL <img src={assets.brownArrow} alt="" />
//         </h2>
//       </div>
//       <div className={styles.cards}>{
//         categories.map(item => (
//           <div className={styles.cardContainer} onClick={() => handleCategoryClick(item.nav)}  style={{ cursor: "pointer" }}>
//             <div className={styles.innerContent} style={{ background: item.color }}>
//               <img className={styles.categoryImg} src={item.img} alt={item.name} />
//             </div>
//             <div className={styles.name}>
//               <p>{item.name}</p>
//               <img src={assets.blackArrow} alt="" />
//             </div>
//           </div>
//         ))
//       }</div>
//     </div>
//   )
// }

// export default Category

import { useNavigate } from 'react-router'
import { assets } from '../../../assets/assets'
import styles from './Category.module.css'
import { delay, motion } from 'framer-motion'

const categories = [
  {
    img: assets.category1,
    name: "Cookies",
    color: "#BA7830",
    nav: "65fc0c45d3cadabee3443e54"
  },
  {
    img: assets.category2,
    name: "Savouries",
    color: "#9F65E8",
    nav: "65f3c6ee7fd052885f56d587"
  },
  {
    img: assets.category3,
    name: "Gift Hampers",
    color: "#FFAE55",
    nav: "65f3c6cf7fd052885f56d584"
  },
  {
    img: assets.category4,
    name: "Cakes",
    color: "#E75866",
    nav: "67b451f7ec3a4e4a3bbe5633"
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
      delayChildren: 0.5,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

const cardHoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
}

const innerContentHoverVariants = {
  hover: {
    scale: 1.05,
    // transition: {
    //   type: "spring",
    //   stiffness: 300,
    //   damping: 10
    // }
  }
}

const arrowHoverVariants = {
  hover: {
    x: 5,
    // transition: {
    //   type: "spring",
    //   stiffness: 300,
    //   damping: 10
    // }
  }
}

const Category = () => {
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    navigate(`/product/all-products?category=${category}`);
  };

  return (
    <motion.div 
  className={styles.container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={containerVariants}
>
  <div className={styles.header}>
    <motion.h2 variants={itemVariants}>SHOP BY CATEGORY</motion.h2>
    <motion.h2 
      style={{ cursor: "pointer" }} 
      onClick={() => navigate("/product/all-products")}
      variants={itemVariants}
      whileHover={{
        color: "#BA7830",
        transition: { duration: 0.4 }
      }}
    >
      VIEW ALL 
      <motion.img 
        src={assets.brownArrow} 
        alt="" 
        variants={arrowHoverVariants}
        whileHover="hover"
      />
    </motion.h2>
  </div>

  {/* 🔥 THIS IS THE STAGGERED WRAPPER */}
  <motion.div 
    className={styles.cards} 
    variants={containerVariants}
  >
    {categories.map((item, index) => (
      <motion.div 
        key={index}
        className={styles.cardContainer} 
        onClick={() => handleCategoryClick(item.nav)}
        variants={itemVariants}   // ✅ This enables the stagger
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className={styles.innerContent} 
          style={{ background: item.color }}
          variants={innerContentHoverVariants}
        >
          <motion.img 
            className={styles.categoryImg} 
            src={item.img} 
            alt={item.name} 
            whileHover={{ scale: 1.1 }}
          />
        </motion.div>
        <motion.div 
          className={styles.name}
          variants={arrowHoverVariants}
        >
          <p>{item.name}</p>
          <motion.img 
            src={assets.blackArrow} 
            alt="" 
            whileHover={{ x: 5 }}
          />
        </motion.div>
      </motion.div>
    ))}
  </motion.div>
</motion.div>

  )
}

export default Category