import { useNavigate } from 'react-router'
import { assets } from '../../../assets/assets'
import styles from './Category.module.css'

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


const Category = () => {
  const navigate = useNavigate()
  // const handleCategoryClick = (category) => {
  //   navigate(`/product/all-products?category=${category}`);
  // };

  const handleCategoryClick = (category) => {
    navigate(`/product/all-products?category=${category}`);
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>SHOP BY CATEGORY</h2>
        <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/product/all-products")}>
          VIEW ALL <img src={assets.brownArrow} alt="" />
        </h2>
      </div>
      <div className={styles.cards}>{
        categories.map(item => (
          <div className={styles.cardContainer} onClick={() => handleCategoryClick(item.nav)}  style={{ cursor: "pointer" }}>
            <div className={styles.innerContent} style={{ background: item.color }}>
              <img className={styles.categoryImg} src={item.img} alt={item.name} />
            </div>
            <div className={styles.name}>
              <p>{item.name}</p>
              <img src={assets.blackArrow} alt="" />
            </div>
          </div>
        ))
      }</div>
    </div>
  )
}

export default Category
