import { useNavigate } from 'react-router'
import { homeImg } from '../../assets/home/home'
import Header from '../home/header/Header'
import HomeProducts from './HomeProducts/HomeProducts'
import styles from './NewHome.module.css'
import TestimonialSlider from './TestimonialSlider/TestimonialSlider'

const NewHome = () => {
  const navigate = useNavigate();

  // Function to handle navigation based on category
  const handleCategoryClick = (category) => {
    navigate(`/product/all-products?category=${category}`);
  };
  return (
    <div className={styles.container}>
      {/* <div className={styles.landing}>
        <img src={homeImg.homeLanding} alt="" />
      </div> */}
      <Header />
      <div className={styles.about}>
        <div className={styles.aboutContainer}>
          <img src={homeImg.about_Us_img} alt="" />
          <div className={styles.aboutContent}>
            <h2>ABOUT US</h2>
            <p>
              Our story began in 1983 when Sardar Tarlochan Singh Ji founded Palji Bakery with a vision to create something extraordinary. Starting as a small home bakery, his passion for baking laid the foundation for what is now a beloved family legacy. Today, his son and grandson continue his tradition, crafting vegetarian bakery products with the same care and dedication. Despite our growth, we remain committed to excellence, ensuring every product meets our high standards of taste and hygiene. Join us in experiencing the magic of our treats, made with passion since our early days.
            </p>
          </div>
        </div>
      </div>
      <HomeProducts />
      <div className={styles.delight}>
        <div className={styles.delightContainer}>
          <img src={homeImg.delight_text} alt="" className={styles.delightText} />
          <h2>IN EVERY BITE</h2>
        </div>
        <img src={homeImg.delight_Cake} className={styles.delightcake} alt="" />
      </div>


      <div className={styles.shopCategories}>
        <div className={styles.shopCategoryContainer}>
          <h1 className={styles.shopCategoryTitle}>SHOP BY CATEGORIES</h1>
          <p className={styles.shopCategoryText}>
            Treat yourself to a burst of flavors with our savory snacks, buttery biscuits, and indulgent cookies. Every bite is a delicious experience, from crispy treats to melt-in-your-mouth moments. Perfect for sharing or savoring on your own.
          </p>

          <div className={styles.category1}>
            <div className={styles.categoryImgContainer} onClick={() => handleCategoryClick('GIFT HAMPERS')}>
              <img src={homeImg.hamper_img} alt="" className={styles.categoryImg} />
              <div className={styles.textOverlay}>
                <img src={homeImg.hamper_text} alt="" />
              </div>
            </div>
            <p>
              Curated collections of items, perfect for gifting on any occasion. They offer a thoughtful and personalized way to show appreciation or celebrate, making every moment special.
            </p>
          </div>

          <div className={styles.category1}>
            <div className={styles.categoryImgContainer} onClick={() => handleCategoryClick('SAVORY')}>
              <img src={homeImg.savory_img} alt="" className={styles.categoryImg} />
              <div className={styles.textOverlay}>
                <img src={homeImg.savory_text} alt="" />
              </div>
            </div>
            <p>
              Bold and rich flavors that cater to those who prefer something more satisfying than sweet. Perfect for indulging or sharing, they add a flavorful touch to any occasion.
            </p>
          </div>

          <div className={styles.category1}>
            <div className={styles.categoryImgContainer} onClick={() => handleCategoryClick('Cookies')} >
              <img src={homeImg.cookies_img} alt="" className={styles.categoryImg} />
              <div className={styles.textOverlay}>
                <img src={homeImg.cookies_text} alt="" />
              </div>
            </div>
            <p>
              Cookies that bring a sweet, comforting indulgence with every bite, offering a delightful treat for any occasion. Whether enjoyed solo or shared, they add a touch of warmth and joy to every moment.
            </p>
          </div>

          <div className={styles.category1}>
            <div className={styles.categoryImgContainer} onClick={() => handleCategoryClick('PREMIUM COOKIES')}>
              <img src={homeImg.bucite_img} alt="" className={styles.categoryImg} />
              <div className={styles.textOverlay}>
                <img src={homeImg.biscuits_text} alt="" />
              </div>
            </div>
            <p>
              Biscuits offer a satisfying, crisp bite that pairs perfectly with tea, coffee, or as a standalone treat. Their simple yet delightful flavor makes them a timeless snack for any occasion.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.freshly}>
        <div className={styles.freshlyContainer}
        >
          <div className={styles.freshlyImages}>
            <div className={styles.img1}>
              <img src={homeImg.freshly_img1} alt="" />
            </div>
            <div className={styles.img2}>
              <img src={homeImg.freshly_img2} alt="" />
            </div>
            <div className={styles.img3}>
              <img src={homeImg.freshly_img3} alt="" />
            </div>
          </div>
          <div className={styles.freshlyContent}>
            <h1>FRESHLY</h1>
            <div className={styles.baked}>
              <h2>BAKED</h2>
              <div>
                <button onClick={() => navigate('/product/all-products')}>VIEW ALL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialSlider />
    </div>
  )
}

export default NewHome
