

// import React, { useEffect, useState } from 'react';
// import { useNavigate  } from 'react-router';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import { makeApi } from '../../../api/callApi';
// import styles from './Cookies.module.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import AddIcon from "../../../assets/add_icon_green.png"
// import RemoveIcon from "../../../assets/remove_icon_red.png"
// import {
//   addToCart,
//   removeFromCart,
//   fetchCart,
//   fetchWishlist,
// } from "../../../utils/productFunction.js"
// import Primaryloader from '../../loaders/primaryloader';
// import LoginPopup from '../../LoginPopup/LoginPopup.jsx';

// const Cookies = () => {
//   // const [allProductLoader, setAllProductLoader] = useState(false);
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [IsLogin, setIsLogin] = useState(false)
//   const [showPopup, setShowPopup] = useState(false)
//   const [cartItems, setCartItems] = useState([])
//   const [quantityLoading, setQuantityLoading] = useState({});
//   const [productLoaders, setProductLoaders] = useState({})
//   const [AllProductLoader, setAllProductLoader] = useState(false)
//   const [AddTocartLoader, setAddTocartLoader] = useState({})
//   const [completeCart, setCompleteCart] = useState([]);


//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     setIsLogin(!!token)
//   }, [localStorage.getItem("token")])


//   const fetchProduct = async () => {
//     try {
//       setAllProductLoader(true);
//       const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET");
//       const categories = categoriesResponse.data.categories;

//       if (categories.length > 0) {
//         const categoryId = categories[1]._id;
//         const response = await makeApi(`/api/get-all-products?name=&category=65fc0c45d3cadabee3443e54`, "GET");
//         setProducts(response.data.products);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setAllProductLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   useEffect(() => {
//     fetchCart(setCartItems , setCompleteCart, setAddTocartLoader);
//     fetchCartItems()
//   }, [])



//   const fetchCartItems = async () => {
//     try {
//       await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };
//   const handleIncreaseQuantity = async (productId, size) => {
//     if (!IsLogin) {
//       setShowPopup(true);
//       return;
//     }
//     const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
//     if (size.quantity === cartItem?.quantity) {
//       toast('Cannot add more than available quantity.', { type: 'error' });
//       return;
//     }
//     try {
//       setQuantityLoading(prev => ({ ...prev, [productId]: true }));
//       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     } finally {
//       setQuantityLoading(prev => ({ ...prev, [productId]: false }));
//     }
//   };


//   const handleDecreaseQuantity = async (productId, size) => {
//     const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
//     if (cartItem && cartItem.quantity > 0) {
//       try {
//         setQuantityLoading(prev => ({ ...prev, [productId]: true }));
//         await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
//       } catch (error) {
//         console.error("Error decreasing quantity:", error);
//       }
//       finally {
//         setQuantityLoading(prev => ({ ...prev, [productId]: false }));
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCart(setCartItems)
//     fetchCartItems()
//   }, [])



//   const closePopup = () => {
//     setShowPopup(false);
//   };




//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>PREMIUM COOKIES</h1>
//       {/* <Slider {...settings} className={styles.slider}> */}

//       {showPopup && <LoginPopup onClose={closePopup} />}
//       {AllProductLoader ? (

//         <div className={styles.AllProductLoader}>
//           <div>
//             <Primaryloader />
//           </div>
//         </div>

//       ) : (
//         <div className={styles.slides}>
//           {products.slice(5, 8).map((item) => (
//             <div className={styles.cardContainer}>
//               <Link to={`/product/product-details/${item._id}`}>
//               <div className={styles.image}>
//                 <img src={item.thumbnail} alt="" />
//               </div>
//               </Link>
//               <div className={styles.content}>
//                 <div className={styles.productName}>
//                   <h2>{item.name}</h2>
//                   <p>Premium Cookies</p>
//                 </div>
//                 <h2 className={styles.weight}> </h2>
//               </div>
//               <div className={styles.cardFooter}>
//                 <div className={styles.price}>
//                   {item.size.length > 0 &&
//                     <p className={styles.productPrice}>
//                       <span>₹</span>{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
//                       {item.size[0].discountPercentage > 0 && (
//                         <span> ₹{item.size[0].price}</span>
//                       )}
//                     </p>
//                   } 
//                 </div>
//                 <div className={styles.add}>

//                   <div className={styles.cartActions}>
//                     {cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
//                       <div className={styles.cartIncDec}>
//                         {/* <img
//                           src={RemoveIcon}
//                           alt=""
//                           onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
//                         /> */}
//                         	<svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDecreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
// 																	<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
// 																</svg>
//                         {quantityLoading[item._id] ? (
//                           <div className={styles.loader}>
//                           </div>
//                         ) : (
//                           <p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
//                         )}
//                         {/* <img
//                           src={AddIcon}
//                           alt=""
//                           onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
//                         /> */}
//                         <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleIncreaseQuantity(item._id, item.size[0])} width="30" height="30" fill="currentColor" class="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
// 																	<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
// 																</svg>
//                       </div>
//                     ) : (
//                       <>
//                         {quantityLoading[item._id] ?
//                           <div className={styles.loader} style={{ margin: "auto" }}>
//                           </div> :
//                           <button

//                             onClick={() => handleIncreaseQuantity(item._id, item.size[0])}

//                           >
//                             Add to Cart
//                           </button>
//                         }
//                       </>
//                     )}
//                   </div>


//                 </div>
//               </div>
//             </div>

//           ))}
//         </div>
//       )}
//       {/* </Slider> */}
//     </div>
//   );
// };

// export default Cookies;


import React, { useState, useRef, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './PremiumCookies.css';
import { makeApi } from '../../../api/callApi';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { LuLoaderCircle } from "react-icons/lu";

import {
  addToCart,
  removeFromCart,
  fetchCart
} from "../../../utils/productFunction";

const Cookies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [allProductLoader, setAllProductLoader] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [completeCart, setCompleteCart] = useState([]);
  const [quantityLoading, setQuantityLoading] = useState({});
  const [AddTocartLoader, setAddTocartLoader] = useState({});
  const [productLoaders, setProductLoaders] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const sliderRef = useRef(null);

  // Fetch products
  const fetchProduct = async () => {
    try {
      setAllProductLoader(true);
      const categoriesResponse = await makeApi(`/api/get-all-categories`, 'GET');
      const categories = categoriesResponse?.data?.categories || [];

      if (categories.length > 0) {
        const categoryId = categories[1]?._id || categories[0]?._id;
        const response = await makeApi(`/api/get-all-products?name=&category=${categoryId}`, 'GET');
        setProducts(response?.data?.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setAllProductLoader(false);
    }
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
      console.log('Cannot add more than available quantity.');
      return;
    }

    const updatedCartItems = cartItems.map(item => {
      if (item.productId === productId && item.size === size._id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (!cartItem) {
      updatedCartItems.push({
        productId,
        size: size._id,
        quantity: 1
      });
    }

    setCartItems(updatedCartItems);
    setQuantityLoading(prev => ({ ...prev, [productId]: true }));

    try {
      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
    } catch (error) {
      console.error("Error increasing quantity:", error);
      fetchCartItems();
    } finally {
      setQuantityLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleDecreaseQuantity = async (productId, size) => {
    const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
    if (!cartItem || cartItem.quantity <= 0) return;

    const updatedCartItems = cartItems
      .map(item => {
        if (item.productId === productId && item.size === size._id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter(item => item.quantity > 0);

    setCartItems(updatedCartItems);
    setQuantityLoading(prev => ({ ...prev, [productId]: true }));

    try {
      await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      fetchCartItems();
    } finally {
      setQuantityLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCart(setCartItems);
    fetchCartItems();

    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2, // default value for tablets and desktops
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 575, // mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };

  return (
    <div className="premiumcookies">
      <div className="premiumheading">
        <h1>PREMIUM COOKIES</h1>
      </div>

      <div className="slider-container">
        {!isMobileOrTablet && (
          <>
            <button className="arrow left-arrow" onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : products.length - 1)}>
              &#10094;
            </button>
          </>
        )}

        {allProductLoader ? (
          <div className={isMobileOrTablet ? "" : "premiumgrid"} ref={sliderRef}>
            {isMobileOrTablet && <Slider {...sliderSettings}>
              {[1, 2, 3].map((_, index) => (
                <div className="griditem" key={index}>
                  <div className="gridimg">
                    <Skeleton height={200} width={'100%'} />
                  </div>
                  <div className="gridcontent">
                    <div className="itemhead">
                      <h3><Skeleton width={100} /></h3>
                      <h3><Skeleton width={50} /></h3>
                    </div>
                    <div className="itemmiddle">
                      <Skeleton width={`60%`} />
                    </div>
                    <div className="itemlower">
                      <div className="lfirst">
                        <Skeleton width={80} height={30} />
                      </div>
                      <Skeleton width={60} height={35} style={{ borderRadius: '5px' }} />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>}
            {
              !isMobileOrTablet &&
              <>
                {[1, 2, 3].map((_, index) => (
                  <div className="griditem" key={index}>
                    <div className="gridimg">
                      <Skeleton height={200} width={'100%'} />
                    </div>
                    <div className="gridcontent">
                      <div className="itemhead">
                        <h3><Skeleton width={100} /></h3>
                        <h3><Skeleton width={50} /></h3>
                      </div>
                      <div className="itemmiddle">
                        <Skeleton width={`60%`} />
                      </div>
                      <div className="itemlower">
                        <div className="lfirst">
                          <Skeleton width={80} height={30} />
                        </div>
                        <Skeleton width={60} height={35} style={{ borderRadius: '5px' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </>

            }
          </div>
        ) : (
          <>
            {isMobileOrTablet ? (
              <Slider {...sliderSettings}>
                {products.length > 0 ? products.slice(5, 8).map((product, index) => renderProduct(product, index)) :
                  <div className="no-products">No products found in this category.</div>
                }
              </Slider>
            ) : (
              <div className="premiumgrid" ref={sliderRef}>
                {products.length > 0 ? products.slice(5, 8).map((product, index) => renderProduct(product, index)) :
                  <div className="no-products">No products found in this category.</div>
                }
              </div>
            )}
          </>
        )}

        {/* {!isMobileOrTablet && (
          <>
            <button className="arrow right-arrow" onClick={() => setCurrentIndex(prev => prev < products.length - 1 ? prev + 1 : 0)}>
              &#10095;
            </button>
          </>
        )} */}
      </div>
    </div>
  );

  function renderProduct(product, index) {
    const cartItem = cartItems.find(
      item => item.productId === product._id && item.size === product.size[0]._id
    );

    return (
      <div className="griditem" key={index}>
        <div className="gridimg">
          <img
            src={product.thumbnail || 'https://res.cloudinary.com/dtivafy25/image/upload/v1742208325/55_s8h0ie.png'}
            alt={product.name || 'Premium Cookie'}
          />
        </div>

        <div className="gridcontent">
          <div className="itemhead">
            <h3>{product.name || 'Product Name'}</h3>
            <h3>{product.size && product.size[0]?.weight ? product.size[0].weight : '800g'}</h3>
          </div>

          <div className="itemlower">
            <div className="lfirst">
              {product.size && product.size.length > 0 ? (
                <p>
                  <span>₹</span>{product.size[0].FinalPrice || '0'}
                  {product.size[0].discountPercentage > 0 && (
                    <>
                      <span className="op">₹{product.size[0].price || '0'}</span>
                      <span className="rp">-{product.size[0].discountPercentage}%</span>
                    </>
                  )}
                </p>
              ) : (
                <p><span>₹</span>0</p>
              )}
            </div>

            {cartItem ? (
              <div className="quantity-control">
                {quantityLoading[product._id] ? (
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                    <LuLoaderCircle className="spin-loader" size={18} />
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleDecreaseQuantity(product._id, product.size[0])}
                      className="qty-btn"
                      disabled={quantityLoading[product._id]}
                    >
                      <FiMinus size={18} />
                    </button>
                    <span className="qty-value">{cartItem.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
                      className="qty-btn"
                      disabled={quantityLoading[product._id]}
                    >
                      <FiPlus size={18} />
                    </button>
                  </>
                )}
              </div>
            ) : (
              // <button
              //   className="addbtn"
              //   onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
              //   disabled={quantityLoading[product._id]}
              // >
              //   {quantityLoading[product._id] ? (
              //     <LuLoaderCircle className="spin-loader" size={18} />
              //   ) : (
              //     "ADD"
              //   )}
              // </button>
              <button
                className="addbtn"
                // onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
                onClick={() => handleIncreaseQuantity(product._id, product.size[0])}
                disabled={quantityLoading[product._id]}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Cookies;
