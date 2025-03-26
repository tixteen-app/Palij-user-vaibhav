

// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { ToastContainer, toast } from "react-toastify";
// // import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
// // import PrimaryLoader from "../loaders/primaryloader.jsx";
// // import BackButton from "./backButton.jsx";
// // import { makeApi } from "../../api/callApi.tsx";
// // import styles from "../../pages/CSS/product/productDetails.module.css";
// // import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js";
// // import AddIcon from "../../assets/add_icon_green.png";
// // import RemoveIcon from "../../assets/remove_icon_red.png";
// // import "../../pages/CSS/product/productDetails.css";
// // import { GoArrowLeft } from "react-icons/go"; 

// // function ProductDetails() {
// //   const navigate = useNavigate();
// //   const { productId } = useParams();
// //   const [completeCart, setCompleteCart] = useState([]);
// //   const [load, setLoad] = useState(false)
// //   const [product, setProduct] = useState(null);
// //   const [selectedImage, setSelectedImage] = useState("");

// //   const [sizes, setSizes] = useState([]);
// //   const [selectedSize, setSelectedSize] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [isInCart, setIsInCart] = useState(false);
// //   const [cartQuantity, setCartQuantity] = useState(0);
// //   const [isLogin, setIsLogin] = useState(false);
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [includes, setIncludes] = useState();
// //   const [quantityLoading, setQuantityLoading] = useState(false);
// //   const [productNuturitions, setProductNuturitions] = useState([]);
// //   const [productLoaders, setProductLoaders] = useState({});
// //   const [fetchCartLoader, setFetchCartLoader] = useState(false);
// //   // const navigate = useNavigate();

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     setIsLogin(!!token);
// //     fetchProduct();
// //     fetchCartItems();
// //   }, [productId]);

// //   const fetchProduct = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

// //       setProduct(response.data.product);
// //       setSizes(response.data.sizes);
// //       setIncludes(response.data.include)
// //       setSelectedImage(response.data.product.thumbnail)
// //       setProductNuturitions(response.data.productNuturitions)
// //       if (response.data.sizes.length > 0) {
// //         const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
// //         setSelectedSize(availableSize || null);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching product details:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleImageClick = (imageUrl) => {
// //     setSelectedImage(imageUrl)
// //   }

// //   const fetchCartItems = async () => {
// //     try {
// //       //   await fetchCart(setCartItems);
// //       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
// //     } catch (error) {
// //       console.error("Error fetching cart items:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     const checkCart = () => {
// //       const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
// //       setIsInCart(!!cartItem);
// //       setCartQuantity(cartItem ? cartItem.quantity : 0);
// //     };
// //     checkCart();
// //   }, [cartItems, productId, selectedSize]);

// //   const handleSizeChange = size => setSelectedSize(size);

// //   const handleAddToCart = async () => {
// //     if (!isLogin) {
// //       setShowPopup(true);
// //       return;
// //     }
// //     if (!selectedSize) {
// //       toast('Please select a size', { type: 'error' });
// //       return;
// //     }
// //     try {
// //       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
// //       navigate('/cart');
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //     }
// //   };

// //   const handleIncreaseQuantity = async () => {
// //     if (!isLogin) {
// //       setShowPopup(true);
// //       return;
// //     }
// //     if (!selectedSize) {
// //       toast('Please select a size', { type: 'error' });
// //       return;
// //     }
// //     if (selectedSize.quantity === cartQuantity) {
// //       toast('Cannot add more than available quantity.', { type: 'error' });
// //       return;
// //     }
// //     try {
// //       setQuantityLoading(true);
// //       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
// //     } catch (error) {
// //       console.error("Error increasing quantity:", error);
// //     }
// //     finally {
// //       setQuantityLoading(false);
// //     }
// //   };

// //   const handleDecreaseQuantity = async () => {
// //     if (cartQuantity > 0) {
// //       try {
// //         await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize._id);
// //       } catch (error) {
// //         console.error("Error decreasing quantity:", error);
// //       }
// //     }
// //   };

// //   const handleBuyNow = () => {
// //     if (!isLogin) {
// //       setShowPopup(true);
// //     } else {
// //       handleAddToCart();
// //       fetchCartItems();
// //     }
// //   };

// //   const closePopup = () => {
// //     setShowPopup(false);
// //   };


// //   function calculateDiscountPercentage(originalPrice, finalPrice) {
// //     if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
// //       return null;
// //     }
// //     const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
// //     return Math.round(discount);
// //   }



// //   if (loading) {
// //     return (
// //       <div className={styles.productLoader}>
// //         <PrimaryLoader />
// //       </div>
// //     );
// //   }

// //   if (!product) {
// //     return <h1>Product Not Found</h1>;
// //   }



// //   console.log("productNuturitions", productNuturitions);

// //   return (
// //     <>
// //       {showPopup && <LoginPopup onClose={closePopup} />}
// //       <ToastContainer position="top-center" />
// //       <div>
// //         <div className={styles.backButton} onClick={() => navigate(-1)}>
// //           {/* <BackButton pageLocation="/product/all-products" /> */}
// //           <GoArrowLeft />
// //         </div>
// //         <div className={styles.productContainer}>
// //           <div className={styles.imgContainer}>
// //             <div className={styles.innerImgContainer}>
// //               {/* Selected Image */}
// //               <div className={styles.mainImg}>
// //                 <img src={selectedImage} alt="Selected" />
// //               </div>

// //               {/* Thumbnails */}
// //               <div className={styles.subImg}>
// //                 <div
// //                   className={`${styles.subImg1} ${selectedImage === product.thumbnail ? styles.activeImage : ""}`}
// //                   onClick={() => handleImageClick(product.thumbnail)}
// //                 >
// //                   <img src={product.thumbnail} alt="Thumbnail" />
// //                 </div>
// //                 {product.image.slice(0, 3).map((imgUrl, index) => (
// //                   <div
// //                     key={index}
// //                     className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
// //                     onClick={() => handleImageClick(imgUrl)}
// //                   >
// //                     <img src={imgUrl} alt={`Product Image ${index + 1}`} />
// //                   </div>
// //                 ))}

// //               </div>
// //             </div>
// //           </div>
// //           <div className={styles.productContant}>
// //             <div className={styles.title}>
// //               <div className={styles.productPriceName}>
// //                 <h1>{product?.name}</h1>
// //                 <div className={styles.priceDetails}>
// //                   <div className={styles.priceFlexCol}>
// //                     <div className={styles.dicountinprecentage}>
// //                       {selectedSize?.price > selectedSize?.FinalPrice &&
// //                         <span style={{ color: 'red', marginLeft: '5px' }}>
// //                           -{calculateDiscountPercentage(selectedSize?.price, selectedSize?.FinalPrice)}%
// //                         </span>}
// //                       <h2>₹{selectedSize?.FinalPrice}</h2>
// //                     </div>
// //                     {selectedSize?.price > selectedSize?.FinalPrice && <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>}
// //                   </div>

// //                   <div>
// //                     {sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
// //                       <div className={styles.sizeOptions}>
// //                         <h3>Select Size:</h3>
// //                         <div className="d-flex gap-2 flex-wrap">
// //                           {sizes.map(size => (
// //                             size.size && size.size.toLowerCase() !== 'null' && ( // Conditional check to exclude null and 'null'
// //                               <button
// //                                 key={size._id}
// //                                 className="btn"
// //                                 style={{
// //                                   backgroundColor: selectedSize?._id === size._id ? '#ff6b6b' : '', // custom color logic
// //                                   color: selectedSize?._id === size._id ? '#fff' : '#000', // text color logic
// //                                 }}
// //                                 onClick={() => handleSizeChange(size)}
// //                               >
// //                                 {size.size} {size.sizetype} - ₹{size.FinalPrice}
// //                               </button>
// //                             )
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>

// //                 </div>
// //               </div>
// //               <div className={styles.actions}>
// //                 {isInCart ? (
// //                   <div className={styles.cartIncDec}>
// //                     <img
// //                       src={RemoveIcon}
// //                       alt=""
// //                       onClick={handleDecreaseQuantity} />
// //                     {quantityLoading ? (
// //                       <div className={styles.countLoaderss}>
// //                         {/* <PrimaryLoader /> */}
// //                       </div>
// //                     ) : (
// //                       <p>{cartQuantity}</p>
// //                     )}
// //                     {/* <p>{cartQuantity}</p> */}
// //                     <img src={AddIcon} alt="" onClick={handleIncreaseQuantity} />
// //                     {/* <button className="btn btn-danger" onClick={() => navigate("/cart")}>Go to Cart</button> */}
// //                   </div>
// //                 ) : (
// //                   fetchCartLoader ? (
// //                     <PrimaryLoader />
// //                   ) : (
// //                     <>
// //                       <div
// //                         className={styles.addTocart}

// //                         onClick={handleIncreaseQuantity}>Add to Cart</div>
// //                       {/* <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button> */}
// //                     </>)
// //                 )}
// //               </div>
// //             </div>
// //             <div className={styles.description}>
// //               <h2>Description</h2>
// //               <p>{product?.description}</p>
// //             </div>
// //             {includes && includes.length > 0 && (
// //               <div className={styles.includes}>
// //                 <h2>INCLUDES</h2>
// //                 <ul>
// //                   {includes.map((item, id) => (
// //                     <li key={id}>{item?.include}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}

// //             {/* product nutritions */}
// //             {
// //               productNuturitions && productNuturitions.length > 1 && (
// //                 <div className={styles.nutritionContainer}>
// //                   <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
// //                     <span>Approximate Composition</span></h2>
// //                   <hr />
// //                   <div className={styles.nutritionGrid}>
// //                     <div className={styles.header}>
// //                       <span>Nutritional Facts</span>
// //                       <span>Values</span>
// //                     </div>
// //                     {productNuturitions.map((item) => (
// //                       <div key={item._id} className={styles.nutritionRow}>
// //                         <span className={styles.nutritionName}>{item.nutrition}</span>
// //                         <span className={styles.nutritionValue}>{item.value}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )
// //             }

// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default ProductDetails;










// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { ToastContainer, toast } from "react-toastify";
// // import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
// // import PrimaryLoader from "../loaders/primaryloader.jsx";
// // import BackButton from "./backButton.jsx";
// // import { makeApi } from "../../api/callApi.tsx";
// // import styles from "../../pages/CSS/product/productDetails.module.css";
// // import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js";
// // import AddIcon from "../../assets/add_icon_green.png";
// // import RemoveIcon from "../../assets/remove_icon_red.png";
// // import "../../pages/CSS/product/productDetails.css";
// // import { GoArrowLeft } from "react-icons/go";
// // import { assets } from "../../assets/assets.js";


// // function ProductDetails() {
// //   const navigate = useNavigate();
// //   const { productId } = useParams();
// //   const [completeCart, setCompleteCart] = useState([]);
// //   const [load, setLoad] = useState(false)
// //   const [product, setProduct] = useState(null);
// //   const [selectedImage, setSelectedImage] = useState("");

// //   const [sizes, setSizes] = useState([]);
// //   const [selectedSize, setSelectedSize] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [isInCart, setIsInCart] = useState(false);
// //   const [cartQuantity, setCartQuantity] = useState(0);
// //   const [isLogin, setIsLogin] = useState(false);
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [includes, setIncludes] = useState();
// //   const [quantityLoading, setQuantityLoading] = useState(false);
// //   const [productNuturitions, setProductNuturitions] = useState([]);
// //   const [productLoaders, setProductLoaders] = useState({});
// //   const [fetchCartLoader, setFetchCartLoader] = useState(false);
// //   // const navigate = useNavigate();

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     setIsLogin(!!token);
// //     fetchProduct();
// //     fetchCartItems();
// //   }, [productId]);

// //   const fetchProduct = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

// //       setProduct(response.data.product);
// //       setSizes(response.data.sizes);
// //       setIncludes(response.data.include)
// //       setSelectedImage(response.data.product.thumbnail)
// //       setProductNuturitions(response.data.productNuturitions)
// //       if (response.data.sizes.length > 0) {
// //         const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
// //         setSelectedSize(availableSize || null);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching product details:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleImageClick = (imageUrl) => {
// //     setSelectedImage(imageUrl)
// //   }

// //   const fetchCartItems = async () => {
// //     try {
// //       //   await fetchCart(setCartItems);
// //       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
// //     } catch (error) {
// //       console.error("Error fetching cart items:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     const checkCart = () => {
// //       const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
// //       setIsInCart(!!cartItem);
// //       setCartQuantity(cartItem ? cartItem.quantity : 0);
// //     };
// //     checkCart();
// //   }, [cartItems, productId, selectedSize]);

// //   const handleSizeChange = size => setSelectedSize(size);

// //   const handleAddToCart = async () => {
// //     if (!isLogin) {
// //       setShowPopup(true);
// //       return;
// //     }
// //     if (!selectedSize) {
// //       toast('Please select a size', { type: 'error' });
// //       return;
// //     }
// //     try {
// //       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
// //       navigate('/cart');
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //     }
// //   };

// //   const handleIncreaseQuantity = async () => {
// //     if (!isLogin) {
// //       setShowPopup(true);
// //       return;
// //     }
// //     if (!selectedSize) {
// //       toast('Please select a size', { type: 'error' });
// //       return;
// //     }
// //     if (selectedSize.quantity === cartQuantity) {
// //       toast('Cannot add more than available quantity.', { type: 'error' });
// //       return;
// //     }
// //     try {
// //       setQuantityLoading(true);
// //       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
// //     } catch (error) {
// //       console.error("Error increasing quantity:", error);
// //     }
// //     finally {
// //       setQuantityLoading(false);
// //     }
// //   };

// //   const handleDecreaseQuantity = async () => {
// //     if (cartQuantity > 0) {
// //       try {
// //         await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize._id);
// //       } catch (error) {
// //         console.error("Error decreasing quantity:", error);
// //       }
// //     }
// //   };

// //   const handleBuyNow = () => {
// //     if (!isLogin) {
// //       setShowPopup(true);
// //     } else {
// //       handleAddToCart();
// //       fetchCartItems();
// //     }
// //   };

// //   const closePopup = () => {
// //     setShowPopup(false);
// //   };


// //   function calculateDiscountPercentage(originalPrice, finalPrice) {
// //     if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
// //       return null;
// //     }
// //     const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
// //     return Math.round(discount);
// //   }



// //   if (loading) {
// //     return (
// //       <div className={styles.productLoader}>
// //         <PrimaryLoader />
// //       </div>
// //     );
// //   }

// //   if (!product) {
// //     return <h1>Product Not Found</h1>;
// //   }



// //   console.log("productNuturitions", productNuturitions);

// //   return (
// //     <>
// //       {showPopup && <LoginPopup onClose={closePopup} />}
// //       <ToastContainer position="top-center" />
// //       <div>
// //         <div className={styles.backButton} onClick={() => navigate(-1)}>
// //           {/* <BackButton pageLocation="/product/all-products" /> */}
// //           <GoArrowLeft />
// //         </div>
// //         <div className={styles.productContainer}>
// //           <div className={styles.imgContainer}>
// //             <div className={styles.innerImgContainer}>
// //               {/* Selected Image */}
// //               <div className={styles.mainImg}>
// //                 <img src={selectedImage} alt="Selected" />
// //               </div>

// //               {/* Thumbnails */}
// //               <div className={styles.subImg}>
// //                 <div
// //                   className={`${styles.subImg1} ${selectedImage === product.thumbnail ? styles.activeImage : ""}`}
// //                   onClick={() => handleImageClick(product.thumbnail)}
// //                 >
// //                   <img src={product.thumbnail} alt="Thumbnail" />
// //                 </div>
// //                 {product.image.slice(0, 3).map((imgUrl, index) => (
// //                   <div
// //                     key={index}
// //                     className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
// //                     onClick={() => handleImageClick(imgUrl)}
// //                   >
// //                     <img src={imgUrl} alt={`Product Image ${index + 1}`} />
// //                   </div>
// //                 ))}

// //               </div>
// //             </div>
// //           </div>
// //           <div className={styles.productContant}>
// //             <div className={styles.title}>
// //               <div className={styles.productPriceName}>
// //                 <h1>{product?.name}</h1>
// //                 <div className={styles.priceDetails}>
// //                   <div className={styles.priceFlexCol}>
// //                     <div className={styles.dicountinprecentage}>
// //                       {selectedSize?.price > selectedSize?.FinalPrice &&
// //                         <span style={{ color: 'red', marginLeft: '5px' }}>
// //                           -{calculateDiscountPercentage(selectedSize?.price, selectedSize?.FinalPrice)}%
// //                         </span>}
// //                       <h2>₹{selectedSize?.FinalPrice}</h2>
// //                     </div>
// //                     {selectedSize?.price > selectedSize?.FinalPrice && <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>}
// //                     <div className={styles.actions}>
// //                       {isInCart ? (
// //                         <div className={styles.cartIncDec}>
// //                           <img
// //                             src={RemoveIcon}
// //                             alt=""
// //                             onClick={handleDecreaseQuantity} />
// //                           {quantityLoading ? (
// //                             <div className={styles.countLoaderss}>
// //                               {/* <PrimaryLoader /> */}
// //                             </div>
// //                           ) : (
// //                             <p>{cartQuantity}</p>
// //                           )}
// //                           {/* <p>{cartQuantity}</p> */}
// //                           <img src={AddIcon} alt="" onClick={handleIncreaseQuantity} />
// //                           {/* <button className="btn btn-danger" onClick={() => navigate("/cart")}>Go to Cart</button> */}
// //                         </div>
// //                       ) : (
// //                         fetchCartLoader ? (
// //                           <PrimaryLoader />
// //                         ) : (
// //                           <>
// //                             <div
// //                               className={styles.addTocart}

// //                               onClick={handleIncreaseQuantity}>Add to Cart</div>
// //                             {/* <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button> */}
// //                           </>)
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className={styles.allAddToCart}>
// //                     {sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
// //                       <div className={styles.sizeOptions}>
// //                         <h3>Select Size:</h3>
// //                         <div className={styles.sizeButtons}>
// //                           {sizes.map(size => (
// //                             size.size && size.size.toLowerCase() !== 'null' && ( // Conditional check to exclude null and 'null'
// //                               <button
// //                                 key={size._id}
// //                                 className="btn"
// //                                 style={{
// //                                   backgroundColor: selectedSize?._id === size._id ? '#ff6b6b' : '', // custom color logic
// //                                   color: selectedSize?._id === size._id ? '#fff' : '#000', // text color logic
// //                                 }}
// //                                 onClick={() => handleSizeChange(size)}
// //                               >
// //                                 {size.size} {size.sizetype} - ₹{size.FinalPrice}
// //                               </button>
// //                             )
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>

// //                 </div>
// //               </div>

// //             </div>
// //             <div className={styles.description}>
// //               <h2>Description</h2>
// //               <p>{product?.description}</p>
// //             </div>
// //             <div className={styles.vegetarian}>
// //               <img src={assets.vegetarian} alt="" />
// //               <p>This is a <strong>Vegetarian</strong> product.</p>
// //             </div>
// //             {includes && includes.length > 0 && (
// //               <div className={styles.includes}>
// //                 <h2>INCLUDES</h2>
// //                 <ul>
// //                   {includes.map((item, id) => (
// //                     <li key={id}>{item?.include}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}

// //             {/* product nutritions */}
// //             {
// //               productNuturitions && productNuturitions.length > 1 && (
// //                 <div className={styles.nutritionContainer}>
// //                   <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
// //                     <span>Approximate Composition</span></h2>
// //                   <hr />
// //                   <div className={styles.nutritionGrid}>
// //                     <div className={styles.header}>
// //                       <span>Nutritional Facts</span>
// //                       <span>Values</span>
// //                     </div>
// //                     {productNuturitions.map((item) => (
// //                       <div key={item._id} className={styles.nutritionRow}>
// //                         <span className={styles.nutritionName}>{item.nutrition}</span>
// //                         <span className={styles.nutritionValue}>{item.value}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )
// //             }

// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default ProductDetails;








// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
// import PrimaryLoader from "../loaders/primaryloader.jsx";
// import BackButton from "./backButton.jsx";
// import { makeApi } from "../../api/callApi.tsx";
// import styles from "../../pages/CSS/product/productDetails.module.css";
// import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js";
// import AddIcon from "../../assets/add_icon_green.png";
// import RemoveIcon from "../../assets/remove_icon_red.png";
// import "../../pages/CSS/product/productDetails.css";
// import { GoArrowLeft } from "react-icons/go";
// import { assets } from "../../assets/assets.js";
// import ReactImageMagnify from 'react-image-magnify';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';



// function ProductDetails() {
//   const navigate = useNavigate();
//   const { productId } = useParams();
//   const [completeCart, setCompleteCart] = useState([]);
//   const [load, setLoad] = useState(false)
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");

//   const [sizes, setSizes] = useState([]);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartQuantity, setCartQuantity] = useState(0);
//   const [isLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [includes, setIncludes] = useState();
//   const [quantityLoading, setQuantityLoading] = useState(false);
//   const [productNuturitions, setProductNuturitions] = useState([]);
//   const [productLoaders, setProductLoaders] = useState({});
//   const [fetchCartLoader, setFetchCartLoader] = useState(false);
//   // const navigate = useNavigate();
//   const [startIndex, setStartIndex] = useState(0);
//   const scrollContainerRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLogin(!!token);
//     fetchProduct();
//     fetchCartItems();
//   }, [productId]);

// /*************  ✨ Codeium Command ⭐  *************/
// /**
//  * Fetches product details from the API.
//  * Sets the product, sizes, includes, and selected image in state.
//  * Sets the first available size as the selected size if available.
//  * Shows a loading indicator while fetching.
//  * @returns {Promise<void>}
//  */
// /******  975c448a-620f-4fe6-a47c-3bd2aace234f  *******/  const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

//       setProduct(response.data.product);
//       setSizes(response.data.sizes);
//       setIncludes(response.data.include)
//       setSelectedImage(response.data.product.thumbnail)
//       setProductNuturitions(response.data.productNuturitions)
//       if (response.data.sizes.length > 0) {
//         const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
//         setSelectedSize(availableSize || null);
//       }
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl)
//   }

//   const fetchCartItems = async () => {
//     try {
//       //   await fetchCart(setCartItems);
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   useEffect(() => {
//     const checkCart = () => {
//       const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
//       setIsInCart(!!cartItem);
//       setCartQuantity(cartItem ? cartItem.quantity : 0);
//     };
//     checkCart();
//   }, [cartItems, productId, selectedSize]);

//   const handleSizeChange = size => setSelectedSize(size);

//   const handleAddToCart = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     try {
//       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
//       navigate('/cart');
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const handleIncreaseQuantity = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     if (selectedSize.quantity === cartQuantity) {
//       toast('Cannot add more than available quantity.', { type: 'error' });
//       return;
//     }
//     try {
//       setQuantityLoading(true);
//       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     }
//     finally {
//       setQuantityLoading(false);
//     }
//   };

//   const handleDecreaseQuantity = async () => {
//     if (cartQuantity > 0) {
//       try {
//         await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize._id);
//       } catch (error) {
//         console.error("Error decreasing quantity:", error);
//       }
//     }
//   };

//   const handleBuyNow = () => {
//     if (!isLogin) {
//       setShowPopup(true);
//     } else {
//       handleAddToCart();
//       fetchCartItems();
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };


//   function calculateDiscountPercentage(originalPrice, finalPrice) {
//     if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
//       return null;
//     }
//     const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
//     return Math.round(discount);
//   }



//   if (loading) {
//     return (
//       <div className={styles.productLoader}>
//         <PrimaryLoader />
//       </div>
//     );
//   }

//   if (!product) {
//     return <h1>Product Not Found</h1>;
//   }


//   const scrollLeft = () => {
//     if (startIndex > 0) {
//       setStartIndex(startIndex - 1);
//     }
//   };

//   const scrollRight = () => {
//     if (startIndex + 4 < product.image.length + 1) {
//       setStartIndex(startIndex + 1);
//     }
//   };



//   console.log("productNuturitions", productNuturitions);

//   return (
//     <>
//       {showPopup && <LoginPopup onClose={closePopup} />}
//       <ToastContainer position="top-center" />
//       <div>
//         <div className={styles.backButton} onClick={() => navigate(-1)}>
//           {/* <BackButton pageLocation="/product/all-products" /> */}
//           <GoArrowLeft />
//         </div>
//         <div className={styles.productContainer}>
//           <div className={styles.imgContainer}>
//             <div className={styles.innerImgContainer}>
//               {/* Selected Image */}
//               <div className={styles.mainImg}>
//                 <div
//                   className={styles.desktopImg}
//                 >

//                   <ReactImageMagnify
//                     {...{
//                       smallImage: {
//                         alt: 'Selected Product Image',
//                         width: 450,
//                         height: 450,
//                         src: selectedImage,
//                         className: "smallZoom"
//                       },
//                       largeImage: {
//                         src: selectedImage,
//                         width: 1800,
//                         height: 1800,
//                         className: "largeZoom",
//                         style: {
//                           backgroundColor: "#000"
//                         }
//                       },
//                       enlargedImagePosition: 'beside',
//                       // isHintEnabled: true,
//                       shouldHideHintAfterFirstActivation: false
//                     }}
//                   />
//                 </div>
//                 <img src={selectedImage} alt="Selected" className={styles.mediaMainImg} />
//               </div>

//               {/* Thumbnails */}
//               {/* <div className={styles.subImg}>
//                 <div
//                   className={`${styles.subImg1} ${selectedImage === product.thumbnail ? styles.activeImage : ""}`}
//                   onClick={() => handleImageClick(product.thumbnail)}
//                 >
//                   <img src={product.thumbnail} alt="Thumbnail" />
//                 </div>
//                 {product.image.map((imgUrl, index) => (
//                   <div
//                     key={index}
//                     className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
//                     onClick={() => handleImageClick(imgUrl)}
//                   >
//                     <img src={imgUrl} alt={`Product Image ${index + 1}`} />
//                   </div>
//                 ))}

//               </div> */}

//               <div className={styles.subImgContainer}>
//                 {(product.image.length + 1) > 4 && (
//                   <button className={styles.scrollButton} onClick={scrollLeft} disabled={startIndex === 0}>
//                     <FaChevronLeft />
//                   </button>
//                 )}
//                 <div className={styles.subImg} ref={scrollContainerRef}>
//                   {[product.thumbnail, ...product.image].slice(startIndex, startIndex + 4).map((imgUrl, index) => (
//                     <div
//                       key={startIndex + index}
//                       className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
//                       onClick={() => handleImageClick(imgUrl)}
//                     >
//                       <img src={imgUrl} alt={`Product Image ${startIndex + index}`} />
//                     </div>
//                   ))}
//                 </div>
//                 {(product.image.length + 1) > 4 && (
//                   <button className={styles.scrollButton} onClick={scrollRight} disabled={startIndex + 4 >= product.image.length + 1}>
//                     <FaChevronRight />
//                   </button>
//                 )}
//               </div>


//             </div>
//           </div>
//           <div className={styles.productContant}>
//             <div className={styles.title}>
//               <div className={styles.productPriceName}>
//                 <h1>{product?.name}</h1>
//                 <div className={styles.priceDetails}>
//                   <div className={styles.priceFlexCol}>
//                     <div className={styles.dicountinprecentage}>
//                       {selectedSize?.price > selectedSize?.FinalPrice &&
//                         <span style={{ color: 'red', marginLeft: '5px' }}>
//                           -{calculateDiscountPercentage(selectedSize?.price, selectedSize?.FinalPrice)}%
//                         </span>}
//                       <h2>₹{selectedSize?.FinalPrice}</h2>
//                     </div>
//                     {selectedSize?.price > selectedSize?.FinalPrice && <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>}
//                     <div className={styles.actions}>
//                       {isInCart ? (
//                         <div className={styles.cartIncDec}>
//                           <img
//                             src={RemoveIcon}
//                             alt=""
//                             onClick={handleDecreaseQuantity} />
//                           {quantityLoading ? (
//                             <div className={styles.countLoaderss}>
//                               {/* <PrimaryLoader /> */}
//                             </div>
//                           ) : (
//                             <p>{cartQuantity}</p>
//                           )}
//                           {/* <p>{cartQuantity}</p> */}
//                           <img src={AddIcon} alt="" onClick={handleIncreaseQuantity} />
//                           {/* <button className="btn btn-danger" onClick={() => navigate("/cart")}>Go to Cart</button> */}
//                         </div>
//                       ) : (
//                         fetchCartLoader ? (
//                           <PrimaryLoader />
//                         ) : (
//                           <>
//                             <div
//                               className={styles.addTocart}

//                               onClick={handleIncreaseQuantity}>Add to Cart</div>
//                             {/* <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button> */}
//                           </>)
//                       )}
//                     </div>
//                   </div>

//                   <div className={styles.allAddToCart}>
//                     {sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
//                       <div className={styles.sizeOptions}>
//                         <h3>Select Size:</h3>
//                         <div className={styles.sizeButtons}>
//                           {sizes.map(size => (
//                             size.size && size.size.toLowerCase() !== 'null' && ( // Conditional check to exclude null and 'null'
//                               <button
//                                 key={size._id}
//                                 className="btn"
//                                 style={{
//                                   backgroundColor: selectedSize?._id === size._id ? '#ff6b6b' : '', // custom color logic
//                                   color: selectedSize?._id === size._id ? '#fff' : '#000', // text color logic
//                                 }}
//                                 onClick={() => handleSizeChange(size)}
//                               >
//                                 {size.size} {size.sizetype} - ₹{size.FinalPrice}
//                               </button>
//                             )
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                 </div>
//               </div>

//             </div>
//             <div className={styles.description}>
//               <h2>Description</h2>
//               <p>{product?.description}</p>
//             </div>
//             <div className={styles.vegetarian}>
//               <img src={assets.vegetarian} alt="" />
//               <p>This is a <strong>Vegetarian</strong> product.</p>
//             </div>
//             {includes && includes.length > 0 && (
//               <div className={styles.includes}>
//                 <h2>INCLUDES</h2>
//                 <ul>
//                   {includes.map((item, id) => (
//                     <li key={id}>{item?.include}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* product nutritions */}
//             {
//               productNuturitions && productNuturitions.length > 1 && (
//                 <div className={styles.nutritionContainer}>
//                   <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
//                     <span>Approximate Composition</span></h2>
//                   <hr />
//                   <div className={styles.nutritionGrid}>
//                     <div className={styles.header}>
//                       <span>Nutritional Facts</span>
//                       <span>Values</span>
//                     </div>
//                     {productNuturitions.map((item) => (
//                       <div key={item._id} className={styles.nutritionRow}>
//                         <span className={styles.nutritionName}>{item.nutrition}</span>
//                         <span className={styles.nutritionValue}>{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )
//             }

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductDetails;







// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
// import PrimaryLoader from "../loaders/primaryloader.jsx";
// import BackButton from "./backButton.jsx";
// import { makeApi } from "../../api/callApi.tsx";
// import styles from "../../pages/CSS/product/productDetails.module.css";
// import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js";
// import AddIcon from "../../assets/add_icon_green.png";
// import RemoveIcon from "../../assets/remove_icon_red.png";
// import "../../pages/CSS/product/productDetails.css";
// import { GoArrowLeft } from "react-icons/go";

// function ProductDetails() {
//   const navigate = useNavigate();
//   const { productId } = useParams();
//   const [completeCart, setCompleteCart] = useState([]);
//   const [load, setLoad] = useState(false)
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");

//   const [sizes, setSizes] = useState([]);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartQuantity, setCartQuantity] = useState(0);
//   const [isLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [includes, setIncludes] = useState();
//   const [quantityLoading, setQuantityLoading] = useState(false);
//   const [productNuturitions, setProductNuturitions] = useState([]);
//   const [productLoaders, setProductLoaders] = useState({});
//   const [fetchCartLoader, setFetchCartLoader] = useState(false);
//   // const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLogin(!!token);
//     fetchProduct();
//     fetchCartItems();
//   }, [productId]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

//       setProduct(response.data.product);
//       setSizes(response.data.sizes);
//       setIncludes(response.data.include)
//       setSelectedImage(response.data.product.thumbnail)
//       setProductNuturitions(response.data.productNuturitions)
//       if (response.data.sizes.length > 0) {
//         const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
//         setSelectedSize(availableSize || null);
//       }
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl)
//   }

//   const fetchCartItems = async () => {
//     try {
//       //   await fetchCart(setCartItems);
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   useEffect(() => {
//     const checkCart = () => {
//       const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
//       setIsInCart(!!cartItem);
//       setCartQuantity(cartItem ? cartItem.quantity : 0);
//     };
//     checkCart();
//   }, [cartItems, productId, selectedSize]);

//   const handleSizeChange = size => setSelectedSize(size);

//   const handleAddToCart = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     try {
//       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
//       navigate('/cart');
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const handleIncreaseQuantity = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     if (selectedSize.quantity === cartQuantity) {
//       toast('Cannot add more than available quantity.', { type: 'error' });
//       return;
//     }
//     try {
//       setQuantityLoading(true);
//       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     }
//     finally {
//       setQuantityLoading(false);
//     }
//   };

//   const handleDecreaseQuantity = async () => {
//     if (cartQuantity > 0) {
//       try {
//         await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize._id);
//       } catch (error) {
//         console.error("Error decreasing quantity:", error);
//       }
//     }
//   };

//   const handleBuyNow = () => {
//     if (!isLogin) {
//       setShowPopup(true);
//     } else {
//       handleAddToCart();
//       fetchCartItems();
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };


//   function calculateDiscountPercentage(originalPrice, finalPrice) {
//     if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
//       return null;
//     }
//     const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
//     return Math.round(discount);
//   }



//   if (loading) {
//     return (
//       <div className={styles.productLoader}>
//         <PrimaryLoader />
//       </div>
//     );
//   }

//   if (!product) {
//     return <h1>Product Not Found</h1>;
//   }



//   console.log("productNuturitions", productNuturitions);

//   return (
//     <>
//       {showPopup && <LoginPopup onClose={closePopup} />}
//       <ToastContainer position="top-center" />
//       <div>
//         <div className={styles.backButton} onClick={() => navigate(-1)}>
//           {/* <BackButton pageLocation="/product/all-products" /> */}
//           <GoArrowLeft />
//         </div>
//         <div className={styles.productContainer}>
//           <div className={styles.imgContainer}>
//             <div className={styles.innerImgContainer}>
//               {/* Selected Image */}
//               <div className={styles.mainImg}>
//                 <img src={selectedImage} alt="Selected" />
//               </div>

//               {/* Thumbnails */}
//               <div className={styles.subImg}>
//                 <div
//                   className={`${styles.subImg1} ${selectedImage === product.thumbnail ? styles.activeImage : ""}`}
//                   onClick={() => handleImageClick(product.thumbnail)}
//                 >
//                   <img src={product.thumbnail} alt="Thumbnail" />
//                 </div>
//                 {product.image.slice(0, 3).map((imgUrl, index) => (
//                   <div
//                     key={index}
//                     className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
//                     onClick={() => handleImageClick(imgUrl)}
//                   >
//                     <img src={imgUrl} alt={`Product Image ${index + 1}`} />
//                   </div>
//                 ))}

//               </div>
//             </div>
//           </div>
//           <div className={styles.productContant}>
//             <div className={styles.title}>
//               <div className={styles.productPriceName}>
//                 <h1>{product?.name}</h1>
//                 <div className={styles.priceDetails}>
//                   <div className={styles.priceFlexCol}>
//                     <div className={styles.dicountinprecentage}>
//                       {selectedSize?.price > selectedSize?.FinalPrice &&
//                         <span style={{ color: 'red', marginLeft: '5px' }}>
//                           -{calculateDiscountPercentage(selectedSize?.price, selectedSize?.FinalPrice)}%
//                         </span>}
//                       <h2>₹{selectedSize?.FinalPrice}</h2>
//                     </div>
//                     {selectedSize?.price > selectedSize?.FinalPrice && <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>}
//                   </div>

//                   <div>
//                     {sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
//                       <div className={styles.sizeOptions}>
//                         <h3>Select Size:</h3>
//                         <div className="d-flex gap-2 flex-wrap">
//                           {sizes.map(size => (
//                             size.size && size.size.toLowerCase() !== 'null' && ( // Conditional check to exclude null and 'null'
//                               <button
//                                 key={size._id}
//                                 className="btn"
//                                 style={{
//                                   backgroundColor: selectedSize?._id === size._id ? '#ff6b6b' : '', // custom color logic
//                                   color: selectedSize?._id === size._id ? '#fff' : '#000', // text color logic
//                                 }}
//                                 onClick={() => handleSizeChange(size)}
//                               >
//                                 {size.size} {size.sizetype} - ₹{size.FinalPrice}
//                               </button>
//                             )
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                 </div>
//               </div>
//               <div className={styles.actions}>
//                 {isInCart ? (
//                   <div className={styles.cartIncDec}>
//                     <img
//                       src={RemoveIcon}
//                       alt=""
//                       onClick={handleDecreaseQuantity} />
//                     {quantityLoading ? (
//                       <div className={styles.countLoaderss}>
//                         {/* <PrimaryLoader /> */}
//                       </div>
//                     ) : (
//                       <p>{cartQuantity}</p>
//                     )}
//                     {/* <p>{cartQuantity}</p> */}
//                     <img src={AddIcon} alt="" onClick={handleIncreaseQuantity} />
//                     {/* <button className="btn btn-danger" onClick={() => navigate("/cart")}>Go to Cart</button> */}
//                   </div>
//                 ) : (
//                   fetchCartLoader ? (
//                     <PrimaryLoader />
//                   ) : (
//                     <>
//                       <div
//                         className={styles.addTocart}

//                         onClick={handleIncreaseQuantity}>Add to Cart</div>
//                       {/* <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button> */}
//                     </>)
//                 )}
//               </div>
//             </div>
//             <div className={styles.description}>
//               <h2>Description</h2>
//               <p>{product?.description}</p>
//             </div>
//             {includes && includes.length > 0 && (
//               <div className={styles.includes}>
//                 <h2>INCLUDES</h2>
//                 <ul>
//                   {includes.map((item, id) => (
//                     <li key={id}>{item?.include}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* product nutritions */}
//             {
//               productNuturitions && productNuturitions.length > 1 && (
//                 <div className={styles.nutritionContainer}>
//                   <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
//                     <span>Approximate Composition</span></h2>
//                   <hr />
//                   <div className={styles.nutritionGrid}>
//                     <div className={styles.header}>
//                       <span>Nutritional Facts</span>
//                       <span>Values</span>
//                     </div>
//                     {productNuturitions.map((item) => (
//                       <div key={item._id} className={styles.nutritionRow}>
//                         <span className={styles.nutritionName}>{item.nutrition}</span>
//                         <span className={styles.nutritionValue}>{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )
//             }

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductDetails;










// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
// import PrimaryLoader from "../loaders/primaryloader.jsx";
// import BackButton from "./backButton.jsx";
// import { makeApi } from "../../api/callApi.tsx";
// import styles from "../../pages/CSS/product/productDetails.module.css";
// import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js";
// import AddIcon from "../../assets/add_icon_green.png";
// import RemoveIcon from "../../assets/remove_icon_red.png";
// import "../../pages/CSS/product/productDetails.css";
// import { GoArrowLeft } from "react-icons/go";
// import { assets } from "../../assets/assets.js";


// function ProductDetails() {
//   const navigate = useNavigate();
//   const { productId } = useParams();
//   const [completeCart, setCompleteCart] = useState([]);
//   const [load, setLoad] = useState(false)
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");

//   const [sizes, setSizes] = useState([]);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartQuantity, setCartQuantity] = useState(0);
//   const [isLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [includes, setIncludes] = useState();
//   const [quantityLoading, setQuantityLoading] = useState(false);
//   const [productNuturitions, setProductNuturitions] = useState([]);
//   const [productLoaders, setProductLoaders] = useState({});
//   const [fetchCartLoader, setFetchCartLoader] = useState(false);
//   // const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLogin(!!token);
//     fetchProduct();
//     fetchCartItems();
//   }, [productId]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

//       setProduct(response.data.product);
//       setSizes(response.data.sizes);
//       setIncludes(response.data.include)
//       setSelectedImage(response.data.product.thumbnail)
//       setProductNuturitions(response.data.productNuturitions)
//       if (response.data.sizes.length > 0) {
//         const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
//         setSelectedSize(availableSize || null);
//       }
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl)
//   }

//   const fetchCartItems = async () => {
//     try {
//       //   await fetchCart(setCartItems);
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   useEffect(() => {
//     const checkCart = () => {
//       const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
//       setIsInCart(!!cartItem);
//       setCartQuantity(cartItem ? cartItem.quantity : 0);
//     };
//     checkCart();
//   }, [cartItems, productId, selectedSize]);

//   const handleSizeChange = size => setSelectedSize(size);

//   const handleAddToCart = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     try {
//       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
//       navigate('/cart');
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const handleIncreaseQuantity = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     if (selectedSize.quantity === cartQuantity) {
//       toast('Cannot add more than available quantity.', { type: 'error' });
//       return;
//     }
//     try {
//       setQuantityLoading(true);
//       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     }
//     finally {
//       setQuantityLoading(false);
//     }
//   };

//   const handleDecreaseQuantity = async () => {
//     if (cartQuantity > 0) {
//       try {
//         await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize._id);
//       } catch (error) {
//         console.error("Error decreasing quantity:", error);
//       }
//     }
//   };

//   const handleBuyNow = () => {
//     if (!isLogin) {
//       setShowPopup(true);
//     } else {
//       handleAddToCart();
//       fetchCartItems();
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };


//   function calculateDiscountPercentage(originalPrice, finalPrice) {
//     if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
//       return null;
//     }
//     const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
//     return Math.round(discount);
//   }



//   if (loading) {
//     return (
//       <div className={styles.productLoader}>
//         <PrimaryLoader />
//       </div>
//     );
//   }

//   if (!product) {
//     return <h1>Product Not Found</h1>;
//   }



//   console.log("productNuturitions", productNuturitions);

//   return (
//     <>
//       {showPopup && <LoginPopup onClose={closePopup} />}
//       <ToastContainer position="top-center" />
//       <div>
//         <div className={styles.backButton} onClick={() => navigate(-1)}>
//           {/* <BackButton pageLocation="/product/all-products" /> */}
//           <GoArrowLeft />
//         </div>
//         <div className={styles.productContainer}>
//           <div className={styles.imgContainer}>
//             <div className={styles.innerImgContainer}>
//               {/* Selected Image */}
//               <div className={styles.mainImg}>
//                 <img src={selectedImage} alt="Selected" />
//               </div>

//               {/* Thumbnails */}
//               <div className={styles.subImg}>
//                 <div
//                   className={`${styles.subImg1} ${selectedImage === product.thumbnail ? styles.activeImage : ""}`}
//                   onClick={() => handleImageClick(product.thumbnail)}
//                 >
//                   <img src={product.thumbnail} alt="Thumbnail" />
//                 </div>
//                 {product.image.slice(0, 3).map((imgUrl, index) => (
//                   <div
//                     key={index}
//                     className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
//                     onClick={() => handleImageClick(imgUrl)}
//                   >
//                     <img src={imgUrl} alt={`Product Image ${index + 1}`} />
//                   </div>
//                 ))}

//               </div>
//             </div>
//           </div>
//           <div className={styles.productContant}>
//             <div className={styles.title}>
//               <div className={styles.productPriceName}>
//                 <h1>{product?.name}</h1>
//                 <div className={styles.priceDetails}>
//                   <div className={styles.priceFlexCol}>
//                     <div className={styles.dicountinprecentage}>
//                       {selectedSize?.price > selectedSize?.FinalPrice &&
//                         <span style={{ color: 'red', marginLeft: '5px' }}>
//                           -{calculateDiscountPercentage(selectedSize?.price, selectedSize?.FinalPrice)}%
//                         </span>}
//                       <h2>₹{selectedSize?.FinalPrice}</h2>
//                     </div>
//                     {selectedSize?.price > selectedSize?.FinalPrice && <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>}
//                     <div className={styles.actions}>
//                       {isInCart ? (
//                         <div className={styles.cartIncDec}>
//                           <img
//                             src={RemoveIcon}
//                             alt=""
//                             onClick={handleDecreaseQuantity} />
//                           {quantityLoading ? (
//                             <div className={styles.countLoaderss}>
//                               {/* <PrimaryLoader /> */}
//                             </div>
//                           ) : (
//                             <p>{cartQuantity}</p>
//                           )}
//                           {/* <p>{cartQuantity}</p> */}
//                           <img src={AddIcon} alt="" onClick={handleIncreaseQuantity} />
//                           {/* <button className="btn btn-danger" onClick={() => navigate("/cart")}>Go to Cart</button> */}
//                         </div>
//                       ) : (
//                         fetchCartLoader ? (
//                           <PrimaryLoader />
//                         ) : (
//                           <>
//                             <div
//                               className={styles.addTocart}

//                               onClick={handleIncreaseQuantity}>Add to Cart</div>
//                             {/* <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button> */}
//                           </>)
//                       )}
//                     </div>
//                   </div>

//                   <div className={styles.allAddToCart}>
//                     {sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
//                       <div className={styles.sizeOptions}>
//                         <h3>Select Size:</h3>
//                         <div className={styles.sizeButtons}>
//                           {sizes.map(size => (
//                             size.size && size.size.toLowerCase() !== 'null' && ( // Conditional check to exclude null and 'null'
//                               <button
//                                 key={size._id}
//                                 className="btn"
//                                 style={{
//                                   backgroundColor: selectedSize?._id === size._id ? '#ff6b6b' : '', // custom color logic
//                                   color: selectedSize?._id === size._id ? '#fff' : '#000', // text color logic
//                                 }}
//                                 onClick={() => handleSizeChange(size)}
//                               >
//                                 {size.size} {size.sizetype} - ₹{size.FinalPrice}
//                               </button>
//                             )
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                 </div>
//               </div>

//             </div>
//             <div className={styles.description}>
//               <h2>Description</h2>
//               <p>{product?.description}</p>
//             </div>
//             <div className={styles.vegetarian}>
//               <img src={assets.vegetarian} alt="" />
//               <p>This is a <strong>Vegetarian</strong> product.</p>
//             </div>
//             {includes && includes.length > 0 && (
//               <div className={styles.includes}>
//                 <h2>INCLUDES</h2>
//                 <ul>
//                   {includes.map((item, id) => (
//                     <li key={id}>{item?.include}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* product nutritions */}
//             {
//               productNuturitions && productNuturitions.length > 1 && (
//                 <div className={styles.nutritionContainer}>
//                   <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
//                     <span>Approximate Composition</span></h2>
//                   <hr />
//                   <div className={styles.nutritionGrid}>
//                     <div className={styles.header}>
//                       <span>Nutritional Facts</span>
//                       <span>Values</span>
//                     </div>
//                     {productNuturitions.map((item) => (
//                       <div key={item._id} className={styles.nutritionRow}>
//                         <span className={styles.nutritionName}>{item.nutrition}</span>
//                         <span className={styles.nutritionValue}>{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )
//             }

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductDetails;








import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
import PrimaryLoader from "../loaders/primaryloader.jsx";
import BackButton from "./backButton.jsx";
import { makeApi } from "../../api/callApi.tsx";
import styles from "../../pages/CSS/product/productDetails.module.css";
import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js";
import AddIcon from "../../assets/add_icon_green.png";
import RemoveIcon from "../../assets/remove_icon_red.png";
import "../../pages/CSS/product/productDetails.css";
import { GoArrowLeft } from "react-icons/go";
import { assets } from "../../assets/assets.js";
import ReactImageMagnify from 'react-image-magnify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';



function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [completeCart, setCompleteCart] = useState([]);
  const [load, setLoad] = useState(false)
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [includes, setIncludes] = useState();
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [productNuturitions, setProductNuturitions] = useState([]);
  const [productLoaders, setProductLoaders] = useState({});
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  // const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
    fetchProduct();
    fetchCartItems();
  }, [productId]);

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Fetches product details from the API.
 * Sets the product, sizes, includes, and selected image in state.
 * Sets the first available size as the selected size if available.
 * Shows a loading indicator while fetching.
 * @returns {Promise<void>}
 */
/******  975c448a-620f-4fe6-a47c-3bd2aace234f  *******/  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

      setProduct(response.data.product);
      setSizes(response.data.sizes);
      setIncludes(response.data.include)
      setSelectedImage(response.data.product.thumbnail)
      setProductNuturitions(response.data.productNuturitions)
      if (response.data.sizes.length > 0) {
        // const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
        const availableSize = response.data.sizes[0];
        setSelectedSize(availableSize || null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  const fetchCartItems = async () => {
    try {
      //   await fetchCart(setCartItems);
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const checkCart = () => {
      const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
      setIsInCart(!!cartItem);
      setCartQuantity(cartItem ? cartItem.quantity : 0);
    };
    checkCart();
  }, [cartItems, productId, selectedSize]);

  const handleSizeChange = size => setSelectedSize(size);

  const handleAddToCart = async () => {
    if (!isLogin) {
      setShowPopup(true);
      return;
    }
    if (!selectedSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }
    try {
      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
      navigate('/cart');
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleIncreaseQuantity = async () => {
    if (!isLogin) {
      setShowPopup(true);
      return;
    }
    if (!selectedSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }
    if (selectedSize.quantity === cartQuantity) {
      toast('Cannot add more than available quantity.', { type: 'error' });
      return;
    }
    try {
      setQuantityLoading(true);
      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
    finally {
      setQuantityLoading(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    console.log(cartQuantity)
    if (cartQuantity > 0) {
      try {
        setQuantityLoading(true);

        await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize._id);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      } finally {
        setQuantityLoading(false);

      }
    }
  };

  const handleBuyNow = () => {
    if (!isLogin) {
      setShowPopup(true);
    } else {
      handleAddToCart();
      fetchCartItems();
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  function calculateDiscountPercentage(originalPrice, finalPrice) {
    if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
      return null;
    }
    const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
    return Math.round(discount);
  }



  if (loading) {
    return (
      <div className={styles.productLoader}>
        <PrimaryLoader />
      </div>
    );
  }

  if (!product) {
    return <h1>Product Not Found</h1>;
  }


  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const scrollRight = () => {
    if (startIndex + 4 < product.image.length + 1) {
      setStartIndex(startIndex + 1);
    }
  };




  return (
    <>
      {showPopup && <LoginPopup onClose={closePopup} />}
      <ToastContainer position="top-center" />
      <div>
        <div className={styles.backButton} >
          {/* <BackButton pageLocation="/product/all-products" /> */}
          <Link to="/product/all-products" >
            <GoArrowLeft />
          </Link>
        </div>
        <div className={styles.productContainer}>
          <div className={styles.imgContainer}>
            <div className={styles.innerImgContainer}>
              {/* Selected Image */}
              <div className={styles.mainImg}>
                <div
                  className={styles.desktopImg}
                >
                  
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: 'Selected Product Image',
                        width: 500,
                        height: 450,
                        src: selectedImage,
                        className: "smallZoom"
                      },
                      largeImage: {
                        src: selectedImage,
                        width: 2500,
                        height: 2500,
                        className: "largeZoom",
                        style: {
                          backgroundColor: "#000"
                        }
                      },
                      // enlargedImagePosition: 'beside',
                      enlargedImageContainerDimensions: {
                        width: "180%",
                        height: "130%",
                      },
                      // isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false
                    }}
                  />
                </div>
                <img src={selectedImage} alt="Selected" className={styles.mediaMainImg} />
              </div>

              {/* Thumbnails */}
              {/* <div className={styles.subImg}>
                <div
                  className={`${styles.subImg1} ${selectedImage === product.thumbnail ? styles.activeImage : ""}`}
                  onClick={() => handleImageClick(product.thumbnail)}
                >
                  <img src={product.thumbnail} alt="Thumbnail" />
                </div>
                {product.image.map((imgUrl, index) => (
                  <div
                    key={index}
                    className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
                    onClick={() => handleImageClick(imgUrl)}
                  >
                    <img src={imgUrl} alt={`Product Image ${index + 1}`} />
                  </div>
                ))}

              </div> */}

              <div className={styles.subImgContainer}>
                {(product.image.length + 1) > 4 && (
                  <button className={styles.scrollButton} onClick={scrollLeft} disabled={startIndex === 0}>
                    <FaChevronLeft />
                  </button>
                )}
                <div className={styles.subImg} ref={scrollContainerRef}>
                  {[product.thumbnail, ...product.image].slice(startIndex, startIndex + 4).map((imgUrl, index) => (
                    <div
                      key={startIndex + index}
                      className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
                      onClick={() => handleImageClick(imgUrl)}
                    >
                      <img src={imgUrl} alt={`Product Image ${startIndex + index}`} />
                    </div>
                  ))}
                </div>
                {(product.image.length + 1) > 4 && (
                  <button className={styles.scrollButton} onClick={scrollRight} disabled={startIndex + 4 >= product.image.length + 1}>
                    <FaChevronRight />
                  </button>
                )}
              </div>


            </div>
          </div>
          <div className={styles.productContant}>
            <div className={styles.title}>
              <div className={styles.productPriceName}>
                <h1 className={styles.productdetailsname}>{product?.name}</h1>
                <div className={styles.priceDetails}>
                  <div className={styles.priceFlexCol}>
                    <div className={styles.dicountinprecentage}>
                      {/* <h2>₹{selectedSize?.FinalPrice}</h2> */}
                      <h2>₹{selectedSize?.FinalPrice.toFixed(2)}</h2>

                      {selectedSize?.price > selectedSize?.FinalPrice &&
                        <span style={{ color: 'red', marginLeft: '15px' }}>
                          -{calculateDiscountPercentage(selectedSize?.price, selectedSize?.FinalPrice)}%
                        </span>}
                    </div>

                    {/* {selectedSize?.price > selectedSize?.FinalPrice ? <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span> : <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>} */}
                    {selectedSize?.price > selectedSize?.FinalPrice && (
                      <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>
                    )}
                    <span className={styles.inclusiveOffAllTax}>Inclusive of all taxes</span>
                    <div className={styles.actions}>
                      {isInCart ? (
                        <div className={styles.cartIncDec}>
                          {/* <img
                            src={RemoveIcon}
                            alt=""
                            onClick={handleDecreaseQuantity} /> */}
                          <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDecreaseQuantity} width="30" height="30" fill="currentColor" class="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                          </svg>
                          {quantityLoading ? (
                            <div className={styles.countLoaderss}>
                            </div>
                          ) : (
                            <p>{cartQuantity}</p>
                          )}
                          {/* <p>{cartQuantity}</p> */}
                          {/* <img src={AddIcon} alt="" onClick={handleIncreaseQuantity} /> */}
                          <svg xmlns="http://www.w3.org/2000/svg" onClick={handleIncreaseQuantity} width="30" height="30" fill="currentColor" class="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                          {/* <button className="btn btn-danger" onClick={() => navigate("/cart")}>Go to Cart</button> */}
                        </div>
                      ) : (
                        fetchCartLoader ? (
                          <PrimaryLoader />
                        ) : (
                          <>
                            <div
                              className={styles.addTocart}

                              onClick={handleIncreaseQuantity}>Add to Cart</div>
                            {/* <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button> */}
                          </>)
                      )}
                    </div>
                  </div>

 
                  <div className={styles.allAddToCart}>
                    {sizes.length > 1 && sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
                      <div className={styles.sizeOptions}>
                        <div className={styles.selectQuntitytext}>Select Quantity:</div>
                        <div className={styles.sizeButtons}>
                          {sizes.map(size => (
                            size.size && size.size.toLowerCase() !== 'null' && (
                              <div
                                key={size._id}
                                className={`${styles.sizeButtondiv} ${size._id === selectedSize?._id ? '' : styles.selectedSizeButton}`}
                                onClick={() => handleSizeChange(size)}
                              >
                                <div className={styles.finalpricebutton}>
                                  ₹{size.FinalPrice}
                                </div>
                                <div className={styles.sizetypebutton}>
                                  {size.size}{size.sizetype}
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>


                </div>
              </div>

            </div>
            {/* <div className={styles.description}>
              <h2>Description</h2>
              <p className={styles.description} >{product?.description}</p>
            </div> */}
            <div className={styles.description}>
              {product?.category?._id == "67b451f7ec3a4e4a3bbe5633" && <div className={styles.availableonlyspan}><span> Available Only in </span> <span style={{ textDecoration: 'underline', textUnderlineOffset: "3px" }} > Ludhiana </span> </div>}
              <p className={styles.description}> </p>
            </div>
            <div className={styles.vegetarian}>
              <img src={assets.vegetarian} alt="" />
              <p>This is a <strong>Vegetarian</strong> product.</p>
            </div>
            {includes && includes.length > 0 && (
              <div className={styles.includes}>
                <h2>INCLUDES</h2>
                <ul>
                  {includes.map((item, id) => (
                    <li key={id}>{item?.include}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* product nutritions */}
            {
              productNuturitions && productNuturitions.length > 1 && (
                <div className={styles.nutritionContainer}>
                  <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
                    <span>Approximate Composition</span></h2>
                  <hr />
                  <div className={styles.nutritionGrid}>
                    <div className={styles.header}>
                      <span>Nutritional Facts</span>
                      <span>Values</span>
                    </div>
                    {productNuturitions.map((item) => (
                      <div key={item._id} className={styles.nutritionRow}>
                        <span className={styles.nutritionName}>{item.nutrition}</span>
                        <span className={styles.nutritionValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;