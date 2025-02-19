
// import React, { useCallback, useEffect, useState } from "react";
// import styles from "../../pages/CSS/product/allProduct.module.css";
// import { IoIosHeart } from "react-icons/io";
// import AddIcon from "../../assets/add_icon_green.png";
// import RemoveIcon from "../../assets/remove_icon_red.png";
// import Primaryloader from "../loaders/primaryloader.jsx";
// import { makeApi } from "../../api/callApi";
// import { Link, useLocation } from "react-router-dom";
// import LoginPopup from "../LoginPopup/LoginPopup.jsx";
// import { toast } from "react-toastify";
// import { fetchCart, fetchWishlist, addToCart, removeFromCart } from "../../utils/productFunction.js";

// function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
// 	const [products, setProducts] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [wishlistItems, setWishlistItems] = useState([]);
// 	const [cartItems, setCartItems] = useState([]);
// 	const [ResultPerPage, setResultPerPage] = useState(50000000);
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [totalPages, setTotalPages] = useState(0);
// 	const [toalProduct, setToalProduct] = useState(0);
// 	const [AllProductLoader, setAllProductLoader] = useState(false);
// 	const [IsLogin, setIsLogin] = useState(false);
// 	const [showPopup, setShowPopup] = useState(false);
// 	const [quantityLoading, setQuantityLoading] = useState({});
// 	const [isInitialLoad, setIsInitialLoad] = useState(true);
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [completeCart, setCompleteCart] = useState([]);
// 	const [AddTocartLoader, setAddTocartLoader] = useState({})



// 	useEffect(() => {
// 		if (isInitialLoad) {
// 			window.scrollTo(0, 0);
// 			setIsInitialLoad(false);
// 		}
// 	}, [isInitialLoad]);

// 	const location = useLocation();

// 	useEffect(() => {
// 		const token = localStorage.getItem("token");
// 		setIsLogin(!!token);
// 	}, []);


// 	const fetchProduct = async (page, cat, searchTerm, min, max) => {
// 		try {
// 			setAllProductLoader(true);
// 			const response = await makeApi(
// 				`/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				"GET"
// 			);
// 			setProducts(response.data.products);
// 			setToalProduct(response.data.totalProducts);
// 			const totalPages = Math.ceil(response.data.totalProducts / 10);
// 			setTotalPages(totalPages);
// 		} catch (error) {
// 			console.error("Error fetching products:", error);
// 		} finally {
// 			setAllProductLoader(false);
// 		}
// 	};

// 	useEffect(() => {
// 		const queryParams = new URLSearchParams(location.search);
// 		const categoryFromUrl = queryParams.get("category") || "";
// 		const searchFromUrl = queryParams.get("search") || "";
// 		const minPriceFromUrl = queryParams.get("minPrice") || "0";
// 		const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

// 		fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
// 	}, [location.search]);

// 	useEffect(() => {
// 		fetchProduct(1, category, search, minPrice, maxPrice);
// 		setCurrentPage(1);
// 		fetchCartItems()

// 	}, [search, category, minPrice, maxPrice]);

// 	useEffect(() => {
// 		fetchCart(setCartItems);
// 	}, []);
// 	const handleIncreaseQuantity = async (productId, size) => {
// 		if (!IsLogin) {
// 			setShowPopup(true);
// 			return;
// 		}
// 		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
// 		if (size.quantity === cartItem?.quantity) {
// 			toast('Cannot add more than available quantity.', { type: 'error' });
// 			return;
// 		}
// 		try {
// 			setQuantityLoading(prev => ({ ...prev, [productId]: true }));
// 			await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
// 		} catch (error) {
// 			console.error("Error increasing quantity:", error);
// 		} finally {
// 			setQuantityLoading(prev => ({ ...prev, [productId]: false }));
// 		}
// 	};

// 	const handleDecreaseQuantity = async (productId, size) => {
// 		const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
// 		if (cartItem && cartItem.quantity > 0) {
// 			try {
// 				await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
// 			} catch (error) {
// 				console.error("Error decreasing quantity:", error);
// 			}
// 		}
// 	};
// 	const closePopup = () => {
// 		setShowPopup(false);
// 	};
// 	const fetchCartItems = async () => {
// 		try {
// 			await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
// 		} catch (error) {
// 			console.error("Error fetching cart items:", error);
// 		}
// 	};
// 	const handlePageClick = (pageNumber) => {
// 		setCurrentPage(pageNumber);
// 		fetchProduct(pageNumber, category, search, minPrice, maxPrice);
// 	};

// 	return (
// 		<div className={styles.mainContainer}>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			{AllProductLoader ? (

// 				<div className={styles.AllProductLoader}>
// 					<div>
// 						<Primaryloader />
// 					</div>
// 				</div>

// 			) : (


// 				<div className={styles.container}>
// 					{products.length === 0 ? (
// 						<div className={styles.NoProductsFound}>No Products Found</div>
// 					) : (
// 						<div>
// 							<div className={styles.productsContainer}>
// 								<h2>{categoryName}</h2>
// 								<div className={styles.allProductsList}>
// 									{products.map(item => (
// 										<div key={item._id} className={styles.products}>
// 											<Link to={`/product/product-details/${item._id}`}>
// 												<div className={styles.productImg}>
// 													<img src={item.thumbnail} alt={item.name} />
// 												</div>
// 											</Link>
// 											<div className={styles.productContent}>
// 												<p className={styles.name}>{item.name}</p>
// 												<div className={styles.pricecart}>
// 													{item.size.length > 0 &&
// 														<p className={styles.productPrice}>
// 															₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
// 															{item.size[0].discountPercentage > 0 && (
// 																<span> ₹{item.size[0].price}</span>
// 															)}
// 														</p>
// 													}
// 													<div className={styles.cartActions}>
// 														{cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
// 															<div className={styles.cartIncDec}>
// 																<img
// 																	src={RemoveIcon}
// 																	alt=""
// 																	onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
// 																/>
// 																{quantityLoading[item._id] ? (
// 																	<div className={styles.loader}>
// 																	</div>
// 																) : (
// 																	<p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
// 																)}
// 																<img
// 																	src={AddIcon}
// 																	alt=""
// 																	onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
// 																/>
// 															</div>
// 														) : (
// 															<>
// 																{quantityLoading[item._id] ?
// 																	<div className={styles.loader} style={{ margin: "auto" }}>
// 																	</div> :
// 																	<button

// 																		onClick={() => handleIncreaseQuantity(item._id, item.size[0])}

// 																	>
// 																		Add to Cart
// 																	</button>
// 																}
// 															</>
// 														)}
// 													</div>
// 												</div>
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 							<div className={styles.pagination}>
// 								{/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 									(pageNumber) => (
// 										<button
// 											key={pageNumber}
// 											className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
// 											onClick={() => handlePageClick(pageNumber)}
// 										>
// 											{pageNumber}
// 										</button>
// 									)
// 								)} */}
// 								{totalPages > 1 && (
// 									<div className={styles.pagination}>
// 										{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
// 											<button
// 												key={pageNumber}
// 												className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
// 												onClick={() => handlePageClick(pageNumber)}
// 											>
// 												{pageNumber}
// 											</button>
// 										))}
// 									</div>
// 								)}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}

// 		</div>
// 	)
// }

// export default Allproduct;

import React, { useCallback, useEffect, useState } from "react";
import styles from "../../pages/CSS/product/allProduct.module.css";
import { IoIosHeart } from "react-icons/io";
import AddIcon from "../../assets/add_icon_green.png";
import RemoveIcon from "../../assets/remove_icon_red.png";
import Primaryloader from "../loaders/primaryloader.jsx";
import { makeApi } from "../../api/callApi";
import { Link, useLocation } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup.jsx";
import { toast } from "react-toastify";
import { fetchCart, fetchWishlist, addToCart, removeFromCart } from "../../utils/productFunction.js";

function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [wishlistItems, setWishlistItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [ResultPerPage, setResultPerPage] = useState(50000000);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [toalProduct, setToalProduct] = useState(0);
	const [AllProductLoader, setAllProductLoader] = useState(false);
	const [IsLogin, setIsLogin] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [quantityLoading, setQuantityLoading] = useState({});
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [productLoaders, setProductLoaders] = useState({})
	const [completeCart, setCompleteCart] = useState([]);
	const [AddTocartLoader, setAddTocartLoader] = useState({})
	const [displayedProducts, setDisplayedProducts] = useState([]);
	const [visibleProducts, setVisibleProducts] = useState(20);

	useEffect(() => {
		if (isInitialLoad) {
			window.scrollTo(0, 0);
			setIsInitialLoad(false);
		}
	}, [isInitialLoad]);

	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLogin(!!token);
	}, []);

	const fetchProduct = async (page, cat, searchTerm, min, max) => {
		try {
			setAllProductLoader(true);
			const response = await makeApi(
				`/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
				"GET"
			);
			setProducts(response.data.products);
			setToalProduct(response.data.totalProducts);
			const totalPages = Math.ceil(response.data.totalProducts / 10);
			setTotalPages(totalPages);
			setDisplayedProducts(response.data.products.slice(0, visibleProducts));
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setAllProductLoader(false);
		}
	};

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const categoryFromUrl = queryParams.get("category") || "";
		const searchFromUrl = queryParams.get("search") || "";
		const minPriceFromUrl = queryParams.get("minPrice") || "0";
		const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

		fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
	}, [location.search]);

	useEffect(() => {
		fetchProduct(1, category, search, minPrice, maxPrice);
		setCurrentPage(1);
		fetchCartItems();
	}, [search, category, minPrice, maxPrice]);

	useEffect(() => {
		fetchCart(setCartItems);
	}, []);

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
				await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
			} catch (error) {
				console.error("Error decreasing quantity:", error);
			}
		}
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	const fetchCartItems = async () => {
		try {
			await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
		} catch (error) {
			console.error("Error fetching cart items:", error);
		}
	};

	const handleLoadMore = () => {
		const nextVisibleProducts = visibleProducts + 10;
		setVisibleProducts(nextVisibleProducts);
		setDisplayedProducts(products.slice(0, nextVisibleProducts));
	};

	return (
		<div className={styles.mainContainer}>
			{showPopup && <LoginPopup onClose={closePopup} />}
			{AllProductLoader ? (
				<div className={styles.AllProductLoader}>
					<div>
						<Primaryloader />
					</div>
				</div>
			) : (
				<div className={styles.container}>
					{products.length === 0 ? (
						<div className={styles.NoProductsFound}>No Products Found</div>
					) : (
						<div>
							<div className={styles.productsContainer}>
								<h2>{categoryName}</h2>
								<div className={styles.allProductsList}>
									{displayedProducts.map(item => (
										<div key={item._id} className={styles.products}>
											<Link to={`/product/product-details/${item._id}`}>
												<div className={styles.productImg}>
													<img src={item.thumbnail} alt={item.name} />
												</div>
											</Link>
											<div className={styles.productContent}>
												<p className={styles.name}>{item.name}</p>
												<div className={styles.pricecart}>
													{item.size.length > 0 &&
														<p className={styles.productPrice}>
															₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
															{item.size[0].discountPercentage > 0 && (
																<span> ₹{item.size[0].price}</span>
															)}
														</p>
													}
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
							</div>
							{visibleProducts < products.length && (
								<div className={styles.loadMoreContainer}>
									<button className={styles.loadMoreButton} onClick={handleLoadMore}>
										Load More
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Allproduct;
// import React, { useEffect, useState } from "react";
// import styles from "../../pages/CSS/product/allProduct.module.css";
// import { IoIosHeart } from "react-icons/io";
// import AddIcon from "../../assets/add_icon_green.png";
// import RemoveIcon from "../../assets/remove_icon_red.png";
// import Primaryloader from "../loaders/primaryloader.jsx";
// import { makeApi } from "../../api/callApi";
// import { Link, useLocation } from "react-router-dom";
// import LoginPopup from "../LoginPopup/LoginPopup.jsx";
// import { toast } from "react-toastify";
// import { fetchCart, fetchWishlist, addToCart, removeFromCart } from "../../utils/productFunction.js";

// function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
//   const [allProducts, setAllProducts] = useState([]); // Store all products fetched from the backend
//   const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
//   const [displayedProducts, setDisplayedProducts] = useState([]); // Store products to display on the current page
//   const [loading, setLoading] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [ResultPerPage, setResultPerPage] = useState(15);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [AllProductLoader, setAllProductLoader] = useState(false);
//   const [IsLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [quantityLoading, setQuantityLoading] = useState({});
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [productLoaders, setProductLoaders] = useState({})
//   const [completeCart, setCompleteCart] = useState([]);
//   const [AddTocartLoader, setAddTocartLoader] = useState({})
//   const [FetchCartLoader,setFetchCartLoader ] = useState(false)


//   useEffect(() => {
//     if (isInitialLoad) {
//       window.scrollTo(0, 0);
//       setIsInitialLoad(false);
//     }
//   }, [isInitialLoad]);

//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLogin(!!token);
//   }, []);

//   // Fetch all products from the backend with filters
//   const fetchAllProducts = async () => {
//     try {
//       setAllProductLoader(true);
//       const response = await makeApi(
//         `/api/get-all-products?name=${search}&category=${category}&subcategory=${subcategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&perPage=5000&IsOutOfStock=false`,
//         "GET"
//       );
//       setAllProducts(response.data.products); // Store all products
//       setFilteredProducts(response.data.products); // Initially, filtered products are the same as all products
//       setTotalPages(Math.ceil(response.data.products.length / ResultPerPage)); // Calculate total pages
//       updateDisplayedProducts(response.data.products, currentPage); // Update displayed products
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setAllProductLoader(false);
//     }
//   };

//   // Update displayed products based on the current page
//   const updateDisplayedProducts = (products, page) => {
//     const startIndex = (page - 1) * ResultPerPage;
//     const endIndex = startIndex + ResultPerPage;
//     setDisplayedProducts(products.slice(startIndex, endIndex));
//   };

//   // Handle page change
//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     updateDisplayedProducts(filteredProducts, pageNumber);
//   };

//   // Fetch products when search, category, minPrice, or maxPrice changes
//   useEffect(() => {
//     fetchAllProducts();
//     setCurrentPage(1); // Reset to the first page when filters change
//   }, [search, category, minPrice, maxPrice]);

//   const handleIncreaseQuantity = async (productId, size) => {
//     if (!IsLogin) {
//       setShowPopup(true);
//       return;
//     }
//     const cartItem = cartItems.find(
//       (item) => item.productId === productId && item.size === size._id
//     );
//     if (size.quantity === cartItem?.quantity) {
//       toast("Cannot add more than available quantity.", { type: "error" });
//       return;
//     }
//     try {
//       setQuantityLoading((prev) => ({ ...prev, [productId]: true }));
//       await addToCart(
//         productId,
//         setIsLogin,
//         setShowPopup,
//         fetchCartItems,
//         setCartItems,
//         setProductLoaders,
//         size._id
//       );
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     } finally {
//       setQuantityLoading((prev) => ({ ...prev, [productId]: false }));
//     }
//   };

//   const handleDecreaseQuantity = async (productId, size) => {
//     const cartItem = cartItems.find(
//       (item) => item.productId === productId && item.size === size._id
//     );
//     if (cartItem && cartItem.quantity > 0) {
//       try {
//         await removeFromCart(
//           productId,
//           setProductLoaders,
//           setCartItems,
//           fetchCartItems,
//           size._id
//         );
//       } catch (error) {
//         console.error("Error decreasing quantity:", error);
//       }
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   const fetchCartItems = async () => {
//     try {
//       await fetchCart(setCartItems);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   return (
//     <div className={styles.mainContainer}>
//       {showPopup && <LoginPopup onClose={closePopup} />}
//       {AllProductLoader ? (
//         <div className={styles.AllProductLoader}>
//           <div>
//             <Primaryloader />
//           </div>
//         </div>
//       ) : (
//         <div className={styles.container}>
//           {filteredProducts.length === 0 ? (
//             <div className={styles.NoProductsFound}>No Products Found</div>
//           ) : (
//             <div>
//               <div className={styles.productsContainer}>
//                 <h2>{categoryName}</h2>
//                 <div className={styles.allProductsList}>
//                   {displayedProducts.map((item) => (
//                     <div key={item._id} className={styles.products}>
//                       <Link to={`/product/product-details/${item._id}`}>
//                         <div className={styles.productImg}>
//                           <img src={item.thumbnail} alt={item.name} />
//                         </div>
//                       </Link>
//                       <div className={styles.productContent}>
//                         <p className={styles.name}>{item.name}</p>
//                         <div className={styles.pricecart}>
//                           {item.size.length > 0 && (
//                             <p className={styles.productPrice}>
//                               ₹{item.size[0].FinalPrice}
//                               {item.size[0].discountPercentage > 0 && (
//                                 <span> ₹{item.size[0].price}</span>
//                               )}
//                             </p>
//                           )}
//                           <div className={styles.cartActions}>
//                             {cartItems.some(
//                               (cartItem) =>
//                                 cartItem.productId === item._id &&
//                                 cartItem.size === item.size[0]._id
//                             ) ? (
//                               <div className={styles.cartIncDec}>
//                                 <img
//                                   src={RemoveIcon}
//                                   alt=""
//                                   onClick={() =>
//                                     handleDecreaseQuantity(item._id, item.size[0])
//                                   }
//                                 />
//                                 {quantityLoading[item._id] ? (
//                                   <div className={styles.loader}></div>
//                                 ) : (
//                                   <p>
//                                     {
//                                       cartItems.find(
//                                         (cartItem) =>
//                                           cartItem.productId === item._id &&
//                                           cartItem.size === item.size[0]._id
//                                       )?.quantity || 0
//                                     }
//                                   </p>
//                                 )}
//                                 <img
//                                   src={AddIcon}
//                                   alt=""
//                                   onClick={() =>
//                                     handleIncreaseQuantity(item._id, item.size[0])
//                                   }
//                                 />
//                               </div>
//                             ) : (
//                               <>
//                                 {quantityLoading[item._id] ? (
//                                   <div className={styles.loader} style={{ margin: "auto" }}></div>
//                                 ) : (
//                                   <button
//                                     onClick={() =>
//                                       handleIncreaseQuantity(item._id, item.size[0])
//                                     }
//                                   >
//                                     Add to Cart
//                                   </button>
//                                 )}
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {totalPages > 1 && (
//                 <div className={styles.pagination}>
//                   {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//                     (pageNumber) => (
//                       <button
//                         key={pageNumber}
//                         className={`${styles.paginationButton} ${
//                           pageNumber === currentPage ? styles.active : ""
//                         }`}
//                         onClick={() => handlePageClick(pageNumber)}
//                       >
//                         {pageNumber}
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Allproduct;
// import React, { useCallback, useEffect, useState } from "react"
// import styles from "../../pages/CSS/product/allProduct.module.css"
// import { IoIosHeart } from "react-icons/io"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import Heartloader from "../loaders/hearloader.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import LoginPopup from "../LoginPopup/LoginPopup.jsx"
// import { makeApi } from "../../api/callApi"
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// 	fetchWishlist,
// } from "../../utils/productFunction.js"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import { toast } from "react-toastify"

// function Allproduct({ search, category, minPrice, maxPrice, categoryName, subcategory }) {
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [ResultPerPage, setResultPerPage] = useState(120)
// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const [toalProduct, setToalProduct] = useState(0)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState({})
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [completeCart, setCompleteCart] = useState([]);
// 	const [quantityLoading, setQuantityLoading] = useState({});

// 	const location = useLocation();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")
// 		setIsLogin(!!token)
// 	}, [localStorage.getItem("token")])
// 	useEffect(() => {
// 		const queryParams = new URLSearchParams(location.search);
// 		const categoryFromUrl = queryParams.get("category") || "";
// 		const searchFromUrl = queryParams.get("search") || "";
// 		const minPriceFromUrl = queryParams.get("minPrice") || "0";
// 		const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

// 		setCurrentPage(1);
// 		fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
// 	}, [location.search]);

// 	// const fetchProduct = async (page, cat, searchTerm, min, max) => {
// 	// 	try {
// 	// 		setAllProductLoader(true);
// 	// 		const response = await makeApi(
// 	// 			`/api/get-all-products?name=${search}&category=${category}&subcategory=${subcategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 	// 			// `get-all-products-for-admin`,
// 	// 			"GET"
// 	// 		);
// 	// 		console.log("Fetched products:", response.data.products);
// 	// 		setProducts(response.data.products);
// 	// 		setToalProduct(response.data.totalProducts);
// 	// 		const totalPages = Math.ceil(response.data.totalProducts / ResultPerPage);
// 	// 		setTotalPages(totalPages);
// 	// 	} catch (error) {
// 	// 		console.error("Error fetching products:", error);
// 	// 	} finally {
// 	// 		setAllProductLoader(false);
// 	// 	}
// 	// };


// 	const fetchProduct = async (page, cat, searchTerm, min, max) => {
// 		try {
// 			setAllProductLoader(true);
// 			const response = await makeApi(
// 				`/api/get-all-products?name=${searchTerm}&category=${cat}&subcategory=${subcategory}&minPrice=${min}&maxPrice=${max}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				"GET"
// 			);
// 			console.log("Fetched products:", response.data.products);
// 			setProducts(response.data.products);
// 			setToalProduct(response.data.totalProducts);
// 			const totalPages = Math.ceil(response.data.totalProducts / ResultPerPage);
// 			setTotalPages(totalPages);
// 		} catch (error) {
// 			console.error("Error fetching products:", error);
// 		} finally {
// 			setAllProductLoader(false);
// 		}
// 	};



// 	// useEffect(() => {
// 	// 	const queryParams = new URLSearchParams(location.search);
// 	// 	const categoryFromUrl = queryParams.get("category") || "";
// 	// 	const searchFromUrl = queryParams.get("search") || "";
// 	// 	const minPriceFromUrl = queryParams.get("minPrice") || "0";
// 	// 	const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

// 	// 	setCurrentPage(1);
// 	// 	fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
// 	// }, [location.search]);

// 	useEffect(() => {
// 		const queryParams = new URLSearchParams(location.search);
// 		const categoryFromUrl = queryParams.get("category") || "";
// 		const searchFromUrl = queryParams.get("search") || "";
// 		const minPriceFromUrl = queryParams.get("minPrice") || "0";
// 		const maxPriceFromUrl = queryParams.get("maxPrice") || "1000000";

// 		setCurrentPage(1);
// 		fetchProduct(1, categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl);
// 	}, [location.search]);



// 	useEffect(() => {
// 		fetchProduct(1) // Reset to the first page when filters change
// 		setCurrentPage(1) // Reset the current page to 1
// 		fetchCart(setCartItems)
// 		fetchCartItems()
// 	}, [search, category, minPrice, maxPrice, ResultPerPage])

// 	useEffect(() => {
// 		fetchProduct() // Fetch products whenever the current page changes
// 	}, [currentPage])

// 	useEffect(() => {
// 		fetchProduct(1) // Reset to the first page when filters change
// 		setCurrentPage(1) // Reset the current page to 1
// 		fetchCart(setCartItems)
// 		fetchCartItems()
// 	}, [search, category, subcategory, minPrice, maxPrice, ResultPerPage])

// 	useEffect(() => {
// 		fetchProduct() // Fetch products whenever the current page changes
// 	}, [currentPage])

// 	const fetchCartItems = async () => {
// 		try {
// 			await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
// 		} catch (error) {
// 			console.error("Error fetching cart items:", error);
// 		}
// 	};

// const handleIncreaseQuantity = async (productId, size) => {
// 	if (!IsLogin) {
// 		setShowPopup(true);
// 		return;
// 	}
// 	const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
// 	if (size.quantity === cartItem?.quantity) {
// 		toast('Cannot add more than available quantity.', { type: 'error' });
// 		return;
// 	}
// 	try {
// 		setQuantityLoading(prev => ({ ...prev, [productId]: true }));
// 		await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
// 	} catch (error) {
// 		console.error("Error increasing quantity:", error);
// 	} finally {
// 		setQuantityLoading(prev => ({ ...prev, [productId]: false }));
// 	}
// };


// const handleDecreaseQuantity = async (productId, size) => {
// 	const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
// 	if (cartItem && cartItem.quantity > 0) {
// 		try {
// 			await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
// 		} catch (error) {
// 			console.error("Error decreasing quantity:", error);
// 		}
// 	}
// };




// 	useEffect(() => {
// 		console.log("Category prop changed:", category);
// 	}, [category]);


// 	const closePopup = () => {
// 		setShowPopup(false);
// 	};

// 	return (
// 		<div className={styles.mainContainer}>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			{AllProductLoader ? (

// 				<div className={styles.AllProductLoader}>
// 					<div>
// 						<Primaryloader />
// 					</div>
// 				</div>

// 			) : (


// 				<div className={styles.container}>
// 					{products.length === 0 ? (
// 						<div className={styles.NoProductsFound}>No Products Found</div>
// 					) : (
// 						<div>
// 							<div className={styles.productsContainer}>
// 								<h2>{categoryName}</h2>
// 								<div className={styles.allProductsList}>
// 									{products.map(item => (
// 										<div key={item._id} className={styles.products}>
// 											<Link to={`/product/product-details/${item._id}`}>
// 												<div className={styles.productImg}>
// 													<img src={item.thumbnail} alt={item.name} />
// 												</div>
// 											</Link>
// 											<div className={styles.productContent}>
// 												<p className={styles.name}>{item.name}</p>
// 												<div className={styles.pricecart}>
// 													{item.size.length > 0 &&
// 														<p className={styles.productPrice}>
// 															₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
// 															{item.size[0].discountPercentage > 0 && (
// 																<span> ₹{item.size[0].price}</span>
// 															)}
// 														</p>
// 													}
// 													<div className={styles.cartActions}>
// 														{cartItems.some(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id) ? (
// 															<div className={styles.cartIncDec}>
// 																<img
// 																	src={RemoveIcon}
// 																	alt=""
// 																	onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
// 																/>
// 																{quantityLoading[item._id] ? (
// 																	<div className={styles.loader}>
// 																	</div>
// 																) : (
// 																	<p>{cartItems.find(cartItem => cartItem.productId === item._id && cartItem.size === item.size[0]._id)?.quantity || 0}</p>
// 																)}
// 																<img
// 																	src={AddIcon}
// 																	alt=""
// 																	onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
// 																/>
// 															</div>
// 														) : (
// 															<>
// 																{quantityLoading[item._id] ?
// 																	<div className={styles.loader} style={{ margin: "auto" }}>
// 																	</div> :
// 																	<button

// 																		onClick={() => handleIncreaseQuantity(item._id, item.size[0])}

// 																	>
// 																		Add to Cart
// 																	</button>
// 																}
// 															</>
// 														)}
// 													</div>
// 												</div>
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 							<div className={styles.pagination}>
// 								{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 									(pageNumber) => (
// 										<button
// 											key={pageNumber}
// 											className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
// 											onClick={() => handlePageClick(pageNumber)}
// 										>
// 											{pageNumber}
// 										</button>
// 									)
// 								)}
// 								{/* {totalPages > 1 && (
// 									<div className={styles.pagination}>
// 										{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 											(pageNumber) => (
// 												<button
// 													key={pageNumber}
// 													className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""
// 														}`}
// 													onClick={() => handlePageClick(pageNumber)}
// 												>
// 													{pageNumber}
// 												</button>
// 											)
// 										)}
// 									</div>
// 								)} */}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}

// 		</div>
// 	)
// }

// export default Allproduct