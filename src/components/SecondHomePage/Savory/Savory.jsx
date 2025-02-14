import { useNavigate } from 'react-router';
import { assets } from '../../../assets/assets'
import styles from './Savory.module.css'
import { useEffect, useRef, useState } from 'react';
import { makeApi } from '../../../api/callApi';

const Savory = () => {

  const [AllProductLoader, setAllProductLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);


  const fetchProduct = async () => {
    try {
      setAllProductLoader(true);
      const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET");
      const categories = categoriesResponse.data.categories;

      if (categories.length > 0) {
        const categoryId = categories[2]._id;
        const response = await makeApi(
          `/api/get-all-products-by-category/${categoryId}`,
          "GET"
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAllProductLoader(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  function handleNavigate(id) {
    navigate(`product/product-details/${id}`)
  }

  const handleCategoryClick = () => {
    navigate(`/product/all-products?category=65f3c6ee7fd052885f56d587`);
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>SAVORY</h2>
        <h2 style={{ cursor: "pointer" }} onClick={handleCategoryClick}>VIEW ALL <img src={assets.brownArrow} alt="" />
        </h2>
      </div>
      <div className={styles.content}>
        {products.slice(0, 4).map(item => (
          <div onClick={() => handleNavigate(item._id)} style={{ cursor: "pointer" }}>
            <div className={styles.productContent}>
              <div className={styles.productImage}>
                <img src={item.thumbnail} alt="" style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
            <div className={styles.name}>
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Savory
