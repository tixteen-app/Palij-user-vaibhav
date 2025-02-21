

import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { makeApi } from '../../../api/callApi';
import styles from './Cookies.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddIcon from "../../../assets/add_icon_green.png"
import RemoveIcon from "../../../assets/remove_icon_red.png"
import {
  addToCart,
  removeFromCart,
  fetchCart,
  fetchWishlist,
} from "../../../utils/productFunction.js"
import Primaryloader from '../../loaders/primaryloader';
import LoginPopup from '../../LoginPopup/LoginPopup.jsx';

const Cookies = () => {
  // const [allProductLoader, setAllProductLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [IsLogin, setIsLogin] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [quantityLoading, setQuantityLoading] = useState({});
  const [productLoaders, setProductLoaders] = useState({})
  const [AllProductLoader, setAllProductLoader] = useState(false)
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
        const categoryId = categories[1]._id;
        const response = await makeApi(`/api/get-all-products?name=&category=65fc0c45d3cadabee3443e54`, "GET");
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

  useEffect(() => {
    fetchCart(setCartItems , setCompleteCart, setAddTocartLoader);
    fetchCartItems()
  }, [])



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

  useEffect(() => {
    fetchCart(setCartItems)
    fetchCartItems()
  }, [])



  const closePopup = () => {
    setShowPopup(false);
  };




  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PREMIUM COOKIES</h1>
      {/* <Slider {...settings} className={styles.slider}> */}

      {showPopup && <LoginPopup onClose={closePopup} />}
      {AllProductLoader ? (

        <div className={styles.AllProductLoader}>
          <div>
            <Primaryloader />
          </div>
        </div>

      ) : (
        <div className={styles.slides}>
          {products.slice(5, 8).map((item) => (
            <div className={styles.cardContainer}>
              <Link to={`/product/product-details/${item._id}`}>
              <div className={styles.image}>
                <img src={item.thumbnail} alt="" />
              </div>
              </Link>
              <div className={styles.content}>
                <div className={styles.productName}>
                  <h2>{item.name}</h2>
                  <p>Premium Cookies</p>
                </div>
                <h2 className={styles.weight}> </h2>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.price}>
                  {item.size.length > 0 &&
                    <p className={styles.productPrice}>
                      <span>₹</span>{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
                      {item.size[0].discountPercentage > 0 && (
                        <span> ₹{item.size[0].price}</span>
                      )}
                    </p>
                  }
                </div>
                <div className={styles.add}>

                  <div className={styles.cartActions}>
                    {cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
                      <div className={styles.cartIncDec}>
                        <img
                          src={RemoveIcon}
                          alt=""
                          onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
                        />
                        {quantityLoading[item._id] ? (
                          <div className={styles.loader}>
                          </div>
                        ) : (
                          <p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
                        )}
                        <img
                          src={AddIcon}
                          alt=""
                          onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
                        />
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

          ))}
        </div>
      )}
      {/* </Slider> */}
    </div>
  );
};

export default Cookies;
