import { useNavigate } from 'react-router';
import { assets } from '../../../assets/assets'
import styles from './newSavory.module.css'
import { useEffect, useRef, useState } from 'react';
import { makeApi } from '../../../api/callApi';
import {
  addToCart,
  removeFromCart,
  fetchCart,
  fetchWishlist,
} from "../../../utils/productFunction.js"
import Primaryloader from '../../loaders/primaryloader';
import LoginPopup from '../../LoginPopup/LoginPopup.jsx';
import AddIcon from "../../../assets/add_icon_green.png"
import RemoveIcon from "../../../assets/remove_icon_red.png"
import { Link } from 'react-router-dom';

const NSavory = () => {

  const [AllProductLoader, setAllProductLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);


  const [selectedSize, setSelectedSize] = useState(null);
  const [IsLogin, setIsLogin] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [quantityLoading, setQuantityLoading] = useState({});
  const [productLoaders, setProductLoaders] = useState({})
  const [AddTocartLoader, setAddTocartLoader] = useState({})
  const [completeCart, setCompleteCart] = useState([]);



  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLogin(!!token)
  }, [localStorage.getItem("token")])

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
    fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
    fetchCartItems()
  }, []);

  function handleNavigate(id) {
    // navigate(`product/product-details/${id}`)
  }

  const handleCategoryClick = () => {
    // navigate(`/product/all-products?category=65f3c6ee7fd052885f56d587`);
  };

  const fetchCartItems = async () => {
    try {
      await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const handleIncreaseQuantity = async (productId, size) => {
    if (!IsLogin) {
      setShowPopup(true);
      return;
    }
    const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
    if (size.quantity === cartItem?.quantity) {
      toast('Cannot add more than available quantity.', { type: 'error' });
      return;
    }
    try {
      setQuantityLoading(prev => ({ ...prev, [productId]: true }));
      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    } finally {
      setQuantityLoading(prev => ({ ...prev, [productId]: false }));
    }
  };


  const handleDecreaseQuantity = async (productId, size) => {
    const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
    if (cartItem && cartItem.quantity > 0) {
      try {
        setQuantityLoading(prev => ({ ...prev, [productId]: true }));
        await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
      finally {
        setQuantityLoading(prev => ({ ...prev, [productId]: false }));
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
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
                <img src={item.thumbnail} alt="" />
              </div>
              <div className={styles.name}>
                <p>{item.name}</p>
              </div>
              <div className={styles.cardFooter}  >
                <div className={styles.price} style={{paddingTop:"4px"}} >
                  {item.size.length > 0 &&
                    <p className={styles.productPrice}>
                      <span>₹</span>{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
                    </p>
                  }
                </div>
                <div className={styles.add}>

                  <div className={styles.cartActions}>
                    {cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
                      <div className={styles.cartIncDec}>
                        <div>
                          {/* <img
                            src={RemoveIcon}
                            alt=""
                            onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
                          /> */}
                          	<svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDecreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
																	<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
																</svg>
                        </div>
                        
                        <div>
                        {quantityLoading[item._id] ? (
                          <div className={styles.loader}>
                          </div>
                        ) : (
                          <div>
                            <p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
                          </div>
                        )}
                        </div>
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleIncreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
																	<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
																</svg>
                          {/* <img
                            src={AddIcon}
                            alt=""
                            onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
                          /> */}
                        </div>
                      </div>
                    ) : (
                      <>
                        {quantityLoading[item._id] ?
                          <div className={styles.loader} style={{ margin: "auto" }}>
                          </div> :
                          <button

                            onClick={() => handleIncreaseQuantity(item._id, item.size[0])}

                          >
                            Add to Cart
                          </button>
                        }
                      </>
                    )}
                  </div>


                </div>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}
 
export default NSavory
